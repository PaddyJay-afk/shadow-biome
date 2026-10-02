import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export type GlobeMarker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  shape: "node" | "ancient" | "missing" | "report";
  primary?: boolean;
};
export type GlobeLine = { points: [number, number][]; color: string; arc?: boolean };
export type GlobeState = {
  markers: GlobeMarker[];
  lines: GlobeLine[];
  selected?: string;
  opacity: number;
  rotating: boolean;
};

export function geoVector(lat: number, lng: number, radius = 1) {
  const phi = THREE.MathUtils.degToRad(lat);
  const theta = THREE.MathUtils.degToRad(lng);
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.cos(theta),
    radius * Math.sin(phi),
    -radius * Math.cos(phi) * Math.sin(theta),
  );
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    mesh.geometry?.dispose();
    const materials = mesh.material
      ? Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material]
      : [];
    for (const material of materials) {
      const map = (material as THREE.MeshBasicMaterial).map;
      map?.dispose();
      material.dispose();
    }
  });
}

/** One renderer per mounted atlas. React controls update layers without rebuilding Earth. */
export function createGlobeScene(
  host: HTMLElement,
  onSelect: (id: string) => void,
  onLost: () => void,
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  const home = geoVector(27, -98, host.clientWidth < 600 ? 4.8 : 3.8);
  camera.position.copy(home);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, host.clientWidth < 600 ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x020a10, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 2.4;
  controls.maxDistance = 6;
  controls.autoRotateSpeed = 0.3;
  scene.add(new THREE.AmbientLight(0xabcfff, 1.65));
  const sun = new THREE.DirectionalLight(0xf5f4df, 2.5);
  sun.position.set(-3, 4, 5);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x167ba9, 1.3);
  fill.position.set(3, -2, -2);
  scene.add(fill);

  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x91b7c5,
    shininess: 15,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), earthMaterial);
  earth.renderOrder = 0;
  scene.add(earth);
  let disposed = false;
  const loader = new THREE.TextureLoader();
  loader.load(
    "/earth/day.webp",
    (map) => {
      if (disposed) {
        map.dispose();
        return;
      }
      map.colorSpace = THREE.SRGBColorSpace;
      map.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      earthMaterial.map = map;
      earthMaterial.needsUpdate = true;
      dirty = true;
    },
    undefined,
    () => onLost(),
  );

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.045, 48, 32),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      uniforms: { tint: { value: new THREE.Color(0x39c9ec) } },
      vertexShader: `varying vec3 vNormal; varying vec3 vPosition;
      void main(){vNormal=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.0);vPosition=p.xyz;gl_Position=projectionMatrix*p;}`,
      fragmentShader: `uniform vec3 tint;varying vec3 vNormal;varying vec3 vPosition;
      void main(){float rim=pow(1.0-abs(dot(normalize(vNormal),normalize(-vPosition))),3.0);gl_FragColor=vec4(tint,rim*0.5);}`,
    }),
  );
  scene.add(atmosphere);

  const grid = new THREE.Group();
  scene.add(grid);
  function addGrid(points: THREE.Vector3[], opacity = 0.11) {
    grid.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: 0x68dbed,
          transparent: true,
          opacity,
          depthWrite: false,
        }),
      ),
    );
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    addGrid(
      Array.from({ length: 181 }, (_, i) => geoVector(lat, i * 2 - 180, 1.005)),
      lat === 0 ? 0.24 : 0.11,
    );
  }
  for (let lng = -180; lng < 180; lng += 30) {
    addGrid(Array.from({ length: 91 }, (_, i) => geoVector(i * 2 - 90, lng, 1.005)));
  }
  // Orbital instrument ring sits outside the geographic layers.
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.35, 0.0015, 4, 160),
    new THREE.MeshBasicMaterial({ color: 0x529aad, transparent: true, opacity: 0.24 }),
  );
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);
  let data = new THREE.Group();
  scene.add(data);
  let pickable: THREE.Mesh[] = [];
  let selectedMarker: GlobeMarker | undefined;
  let currentState: GlobeState;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let inView = true;
  const visibility = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  });
  visibility.observe(host);
  const resize = new ResizeObserver(() => {
    const width = host.clientWidth,
      height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    dirty = true;
  });
  resize.observe(host);
  let lastTick = performance.now();
  let last = 0;
  let dirty = true;
  controls.addEventListener("change", () => {
    dirty = true;
  });
  renderer.setAnimationLoop((time) => {
    if (!inView || document.hidden || time - last < 1000 / 30) return;
    last = time;
    controls.autoRotate = Boolean(currentState?.rotating && !reduced.matches);
    controls.update(Math.min(0.1, (time - lastTick) / 1000));
    lastTick = time;
    if (dirty || controls.autoRotate) {
      renderer.render(scene, camera);
      dirty = false;
    }
  });
  let down = { x: 0, y: 0 };
  const raycaster = new THREE.Raycaster();
  const start = (e: PointerEvent) => {
    down = { x: e.clientX, y: e.clientY };
  };
  const pick = (e: PointerEvent) => {
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 7) return;
    const rect = renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(
      new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        (-(e.clientY - rect.top) / rect.height) * 2 + 1,
      ),
      camera,
    );
    // Surface mode ignores the far hemisphere; transparency reveals rear markers.
    const hits = raycaster
      .intersectObjects(pickable)
      .filter((hit) => currentState.opacity < 0.7 || hit.point.dot(camera.position) > 0);
    if (hits[0]) onSelect(String(hits[0].object.userData.id));
  };
  const lost = (event: Event) => {
    event.preventDefault();
    onLost();
  };
  renderer.domElement.addEventListener("pointerdown", start);
  renderer.domElement.addEventListener("pointerup", pick);
  renderer.domElement.addEventListener("webglcontextlost", lost);

  function update(state: GlobeState) {
    const unchanged =
      currentState?.markers === state.markers &&
      currentState?.lines === state.lines &&
      currentState?.selected === state.selected;
    currentState = state;
    dirty = true;
    earthMaterial.opacity = state.opacity;
    earthMaterial.depthWrite = state.opacity >= 0.7;
    if (unchanged) return;
    scene.remove(data);
    disposeObject(data);
    data = new THREE.Group();
    scene.add(data);
    pickable = [];
    // Merge line segments by color: large magnetic data sets need only a few draw calls.
    const segments = new Map<string, number[]>();
    for (const line of state.lines) {
      const coords = segments.get(line.color) ?? [];
      let points: THREE.Vector3[];
      if (line.arc && line.points.length === 2) {
        const a = geoVector(line.points[0][1], line.points[0][0]);
        const b = geoVector(line.points[1][1], line.points[1][0]);
        const angle = a.angleTo(b);
        points = Array.from({ length: 49 }, (_, i) => {
          const t = i / 48;
          const point =
            Math.abs(Math.sin(angle)) > 0.001
              ? a
                  .clone()
                  .multiplyScalar(Math.sin((1 - t) * angle) / Math.sin(angle))
                  .add(b.clone().multiplyScalar(Math.sin(t * angle) / Math.sin(angle)))
              : a.clone().lerp(b, t);
          return point
            .normalize()
            .multiplyScalar(1.012 + Math.sin(t * Math.PI) * (0.08 + angle * 0.12));
        });
      } else {
        points = line.points.map(([lng, lat]) => geoVector(lat, lng, 1.012));
      }
      for (let i = 1; i < points.length; i++)
        coords.push(...points[i - 1].toArray(), ...points[i].toArray());
      segments.set(line.color, coords);
    }
    for (const [color, coords] of segments) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
      data.add(
        new THREE.LineSegments(
          geometry,
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
          }),
        ),
      );
    }
    for (const marker of state.markers) {
      const selected = marker.id === state.selected;
      const p = geoVector(marker.lat, marker.lng, 1.025);
      const dot = new THREE.Mesh(
        marker.shape === "ancient"
          ? new THREE.OctahedronGeometry(0.009)
          : new THREE.SphereGeometry(selected ? 0.014 : 0.009, 8, 6),
        new THREE.MeshBasicMaterial({
          color: selected ? 0xffffff : marker.color,
          transparent: true,
          opacity: 0.96,
        }),
      );
      dot.position.copy(p);
      data.add(dot);
      // Invisible pick target gives pins a useful touch radius, without oversized visuals.
      const target = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 6, 4),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      target.position.copy(p);
      target.userData.id = marker.id;
      data.add(target);
      pickable.push(target);
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(selected ? 0.024 : 0.015, selected ? 0.028 : 0.017, 24),
        new THREE.MeshBasicMaterial({
          color: selected ? 0xffffff : marker.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: selected ? 0.95 : 0.65,
          depthWrite: false,
        }),
      );
      halo.position.copy(p.clone().multiplyScalar(1.005));
      halo.lookAt(p.clone().multiplyScalar(2));
      data.add(halo);
      if (selected || (marker.primary && ["nttr", "anwr"].includes(marker.id))) {
        const end = p.clone().multiplyScalar(selected ? 1.15 : 1.075);
        data.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([p, end]),
            new THREE.LineBasicMaterial({ color: marker.color, transparent: true, opacity: 0.8 }),
          ),
        );
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "rgba(3,14,22,0.9)";
          ctx.fillRect(0, 0, 512, 64);
          ctx.fillStyle = selected ? "#ffffff" : "#bcebf0";
          ctx.font = "24px monospace";
          ctx.fillText(marker.name.toUpperCase(), 16, 41);
          const texture = new THREE.CanvasTexture(canvas);
          const label = new THREE.Sprite(
            new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }),
          );
          label.position.copy(end);
          label.scale.set(0.28, 0.035, 1);
          data.add(label);
        }
      }
    }
    const next = state.markers.find((m) => m.id === state.selected);
    if (next && next.id !== selectedMarker?.id) {
      camera.position.copy(geoVector(next.lat, next.lng, Math.max(2.8, camera.position.length())));
      controls.update();
    }
    selectedMarker = next;
  }
  return {
    update,
    reset() {
      camera.position.copy(home);
      controls.target.set(0, 0, 0);
      controls.update();
    },
    zoom(delta: number) {
      camera.position.multiplyScalar(delta);
      camera.position.setLength(THREE.MathUtils.clamp(camera.position.length(), 2.4, 6));
      controls.update();
    },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      resize.disconnect();
      visibility.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("pointerdown", start);
      renderer.domElement.removeEventListener("pointerup", pick);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      disposeObject(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
