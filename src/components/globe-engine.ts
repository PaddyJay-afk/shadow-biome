import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { Timer } from "three/addons/misc/Timer.js";
import { ANCIENT } from "@/data/ancient";
import { CONTINENTS } from "@/data/continents";
import { PEAKS, paintEarth } from "@/components/earth-paint";
import { FAULTS } from "@/data/faults";
import { ISOGONICS } from "@/data/isogonics";
import { GRID_MERIDIANS, GRID_PARALLELS, LEYS } from "@/data/leys";
import { CLUSTERS } from "@/data/missing";
import { FIBERS, NODES, nodeById } from "@/data/network";

export type GlobeHover =
  | { kind: "n" | "a" | "m" | "f" | "l"; id: string }
  | null;

export type GlobeState = {
  layers: ReadonlySet<1 | 2 | 3>;
  declination: boolean;
  faults: boolean;
  leys: boolean;
  ancient: boolean;
  missing: boolean;
  selectedId?: string;
  reports: { id: string; lat: number; lng: number }[];
};

type PickKind = "n" | "a" | "m" | "f" | "l";

const R = 1;

function ll(lat: number, lng: number, radius = R): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function splitLng(path: [number, number][]): [number, number][][] {
  const out: [number, number][][] = [];
  let cur: [number, number][] = [];
  for (let i = 0; i < path.length; i++) {
    if (i > 0 && Math.abs(path[i][1] - path[i - 1][1]) > 180) {
      if (cur.length > 1) out.push(cur);
      cur = [path[i]];
    } else cur.push(path[i]);
  }
  if (cur.length > 1) out.push(cur);
  return out;
}

function flowMaterial(
  color: string,
  speed = 0.12,
  gain = 1,
  additive = true,
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uSpeed: { value: speed },
      uGain: { value: gain },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uSpeed;
      uniform float uGain;
      varying vec2 vUv;
      void main() {
        float band = fract(vUv.x * 1.6 - uTime * uSpeed);
        float head = smoothstep(0.0, 0.12, band) * smoothstep(0.55, 0.12, band);
        float spine = smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.65, vUv.y);
        vec3 hot = mix(uColor, vec3(1.0), 0.55);
        vec3 col = mix(uColor, hot, head) * (1.15 + head * 1.8) * (0.45 + spine);
        gl_FragColor = vec4(col * uGain, 0.95);
      }
    `,
    transparent: true,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false,
    toneMapped: false,
  });
}

let earthCanvas: HTMLCanvasElement | null = null;

export function placeSnapshot(lat: number, lng: number): string {
  const src = earthCanvas;
  if (!src) return "";
  const out = document.createElement("canvas");
  out.width = 720;
  out.height = 420;
  const ctx = out.getContext("2d");
  if (!ctx) return "";
  const w = src.width;
  const h = src.height;
  const cx = ((lng + 180) / 360) * w;
  const cy = ((90 - lat) / 180) * h;
  const sw = w * 0.08;
  const sh = h * 0.11;
  const sy = Math.max(0, Math.min(h - sh, cy - sh / 2));
  const sx = cx - sw / 2;
  const blit = (fromX: number, destX: number, sliceW: number) => {
    if (sliceW <= 0) return;
    ctx.drawImage(src, fromX, sy, sliceW, sh, destX, 0, (sliceW / sw) * out.width, out.height);
  };
  if (sx < 0) {
    blit(w + sx, 0, -sx);
    blit(0, (-sx / sw) * out.width, sw + sx);
  } else if (sx + sw > w) {
    const left = w - sx;
    blit(sx, 0, left);
    blit(0, (left / sw) * out.width, sw - left);
  } else {
    ctx.drawImage(src, sx, sy, sw, sh, 0, 0, out.width, out.height);
  }
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 1;
  ctx.strokeRect(out.width / 2 - 7, out.height / 2 - 7, 14, 14);
  return out.toDataURL("image/jpeg", 0.84);
}

function landTexture(): THREE.CanvasTexture {
  const canvas = paintEarth(CONTINENTS);
  earthCanvas = canvas;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function surfacePaths(path: [number, number][], lift: number, steps: number): THREE.Vector3[][] {
  const radius = R + lift;
  return splitLng(path).map((seg) => {
    const anchors = seg.map(([lat, lng]) => ll(lat, lng, 1));
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[i];
      const b = anchors[i + 1];
      for (let s = 0; s < steps; s++) {
        pts.push(a.clone().lerp(b, s / steps).normalize().multiplyScalar(radius));
      }
    }
    const last = anchors[anchors.length - 1];
    if (last) pts.push(last.clone().multiplyScalar(radius));
    return pts;
  });
}

function addTube(
  path: [number, number][],
  radius: number,
  lift: number,
  steps: number,
  material: THREE.Material,
  parent: THREE.Object3D,
) {
  for (const pts of surfacePaths(path, lift, steps)) {
    if (pts.length < 2) continue;
    const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
    const geo = new THREE.TubeGeometry(curve, Math.max(8, pts.length), radius, 5, false);
    parent.add(new THREE.Mesh(geo, material));
  }
}

function addLine(
  path: [number, number][],
  lift: number,
  material: THREE.Material,
  parent: THREE.Object3D,
) {
  for (const seg of splitLng(path)) {
    const pts = seg.map(([lat, lng]) => ll(lat, lng, R + lift));
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    parent.add(new THREE.Line(geo, material));
  }
}

function nodeOn(kind: string, layers: ReadonlySet<1 | 2 | 3>) {
  if (kind === "keepaway") return true;
  if (layers.has(3) && (kind === "watch" || kind === "crop")) return true;
  if (layers.has(2) && (kind === "uso" || kind === "sphere-hub")) return true;
  if (layers.has(1) && kind === "sphere-hub") return true;
  return false;
}

export type GlobeApi = {
  setState: (state: GlobeState) => void;
  dispose: () => void;
};

export function mountGlobe(
  host: HTMLElement,
  onHover: (hit: GlobeHover) => void,
  onPick: (hit: GlobeHover) => void,
): GlobeApi {
  const pr = Math.min(window.devicePixelRatio || 1, host.clientWidth < 700 ? 1.5 : 2);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(pr);
  renderer.setClearColor(0x071018, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.touchAction = "none";
  renderer.domElement.style.display = "block";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 80);
  camera.position.set(0.2, 0.28, 2.25);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 1.45;
  controls.maxDistance = 4.4;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.35;
  controls.rotateSpeed = 0.55;

  scene.add(new THREE.AmbientLight(0xeef4ff, 0.45));
  const sun = new THREE.DirectionalLight(0xfff6e8, 1.5);
  sun.position.set(5, 2.2, 3.4);
  scene.add(sun);

  const earthMat = new THREE.ShaderMaterial({
    uniforms: { uMap: { value: landTexture() } },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: true,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * w;
      }
    `,
    fragmentShader: `
      uniform sampler2D uMap;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorld;
      void main() {
        vec2 uv = gl_FrontFacing ? vUv : vec2(1.0 - vUv.x, vUv.y);
        vec3 col = texture2D(uMap, uv).rgb;
        vec3 n = normalize(vNormal);
        vec3 sunDir = normalize(vec3(0.86, 0.32, 0.4));
        vec3 viewDir = normalize(cameraPosition - vWorld);
        float ndl = clamp(dot(n, sunDir), 0.0, 1.0);
        col *= 0.55 + 0.5 * ndl;
        float spec = pow(max(dot(reflect(-sunDir, n), viewDir), 0.0), 48.0);
        float ocean = smoothstep(0.02, 0.2, col.b - max(col.r, col.g * 0.9));
        col += spec * (0.08 + ocean * 0.55);
        float fres = pow(1.0 - abs(dot(n, viewDir)), 1.7);
        col = mix(col, vec3(0.78, 0.92, 1.0), fres * 0.22);
        float alpha = mix(0.62, 0.4, ocean);
        alpha *= mix(1.0, 0.78, fres);
        gl_FragColor = vec4(col, clamp(alpha, 0.28, 0.72));
      }
    `,
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 160, 120), earthMat);
  earth.renderOrder = 1;
  scene.add(earth);

  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x7a5644,
    roughness: 0.94,
    metalness: 0,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x8d4c32,
    roughness: 0.9,
    metalness: 0,
  });
  const snowMat = new THREE.MeshStandardMaterial({
    color: 0xf3f6f8,
    roughness: 0.62,
    metalness: 0,
  });
  const peaks = new THREE.Group();
  peaks.renderOrder = 2;
  for (const peak of PEAKS) {
    const nrm = ll(peak.lat, peak.lng, 1).normalize();
    const body = new THREE.Mesh(
      new THREE.ConeGeometry(0.016 + peak.h * 0.22, peak.h * 1.15, 7),
      peak.snow ? rockMat : rustMat,
    );
    body.position.copy(nrm.clone().multiplyScalar(R + peak.h * 0.42));
    body.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), nrm);
    peaks.add(body);
    if (peak.snow) {
      const cap = new THREE.Mesh(
        new THREE.ConeGeometry(0.006 + peak.h * 0.08, peak.h * 0.38, 5),
        snowMat,
      );
      cap.position.copy(nrm.clone().multiplyScalar(R + peak.h * 0.78));
      cap.quaternion.copy(body.quaternion);
      peaks.add(cap);
    }
  }
  scene.add(peaks);

  const atmos = new THREE.Mesh(
    new THREE.SphereGeometry(R * 1.075, 96, 64),
    new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float f = pow(0.78 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
          vec3 air = vec3(0.55, 0.82, 1.0);
          gl_FragColor = vec4(air, clamp(f, 0.0, 1.0) * 0.42);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  scene.add(atmos);

  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(900 * 3);
  for (let i = 0; i < 900; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(28 + Math.random() * 10);
    starPos[i * 3] = v.x;
    starPos[i * 3 + 1] = v.y;
    starPos[i * 3 + 2] = v.z;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  scene.add(
    new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0x9bb0c0,
        size: 0.035,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    ),
  );

  const times: { value: number }[] = [];
  const fiberMat = (color: string, speed: number, gain = 1, additive = true) => {
    const m = flowMaterial(color, speed, gain, additive);
    times.push(m.uniforms.uTime);
    return m;
  };
  const m1 = fiberMat("#d9fbff", 0.16, 1.15, false);
  const m1h = fiberMat("#7ee8ff", 0.16, 0.22, true);
  const m2 = fiberMat("#8fd4ff", 0.22, 1.05, false);
  const m2h = fiberMat("#5eb8ff", 0.22, 0.18, true);
  const m3 = fiberMat("#efe4ff", 0.3, 1.05, false);
  const m3h = fiberMat("#c4b0ff", 0.3, 0.16, true);
  const mFault = fiberMat("#ff5a32", 0.08, 1.1, false);
  const mLey = fiberMat("#e8b15a", 0.06, 1.05, false);
  const mIso = new THREE.LineBasicMaterial({
    color: 0x7ee8ff,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const mIso0 = new THREE.LineBasicMaterial({
    color: 0xe8fbff,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const mGrid = new THREE.LineBasicMaterial({
    color: 0xe4c48a,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });

  const g1 = new THREE.Group();
  const g2 = new THREE.Group();
  const g3 = new THREE.Group();
  const gFault = new THREE.Group();
  const gLey = new THREE.Group();
  gFault.visible = false;
  gLey.visible = false;
  const gIso = new THREE.Group();
  const gAncient = new THREE.Group();
  const gMissing = new THREE.Group();
  const gNodes = new THREE.Group();
  const gReports = new THREE.Group();
  scene.add(g1, g2, g3, gFault, gLey, gIso, gAncient, gMissing, gNodes, gReports);

  for (const f of FIBERS) {
    const a = nodeById(f.from);
    const b = nodeById(f.to);
    if (!a || !b) continue;
    const parent = f.layer === 1 ? g1 : f.layer === 2 ? g2 : g3;
    const lift = f.layer === 1 ? 0.06 : f.layer === 2 ? 0.038 : 0.022;
    const radius = f.layer === 1 ? 0.007 : f.layer === 2 ? 0.0052 : 0.0038;
    const mat = f.layer === 1 ? m1 : f.layer === 2 ? m2 : m3;
    const halo = f.layer === 1 ? m1h : f.layer === 2 ? m2h : m3h;
    addTube(
      [
        [a.lat, a.lng],
        [b.lat, b.lng],
      ],
      radius * 2.6,
      lift,
      20,
      halo,
      parent,
    );
    addTube(
      [
        [a.lat, a.lng],
        [b.lat, b.lng],
      ],
      radius,
      lift + 0.004,
      24,
      mat,
      parent,
    );
  }

  for (const fault of FAULTS) {
    addTube(fault.path, 0.0036, 0.01, 3, mFault, gFault);
    const mid = fault.path[Math.floor(fault.path.length / 2)];
    const pick = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 8, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    pick.position.copy(ll(mid[0], mid[1], R + 0.02));
    pick.userData = { kind: "f" as PickKind, id: fault.id };
    gFault.add(pick);
  }

  for (const ley of LEYS) {
    addTube(ley.path, 0.0028, 0.012, 4, mLey, gLey);
    const mid = ley.path[Math.floor(ley.path.length / 2)];
    const pick = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    pick.position.copy(ll(mid[0], mid[1], R + 0.02));
    pick.userData = { kind: "l" as PickKind, id: ley.id };
    gLey.add(pick);
  }
  for (const lng of GRID_MERIDIANS) {
    const pts: [number, number][] = [];
    for (let lat = -75; lat <= 75; lat += 8) pts.push([lat, lng]);
    addLine(pts, 0.008, mGrid, gLey);
  }
  for (const lat of GRID_PARALLELS) {
    const pts: [number, number][] = [];
    for (let lng = -180; lng <= 180; lng += 8) pts.push([lat, lng]);
    addLine(pts, 0.008, mGrid, gLey);
  }

  for (const iso of ISOGONICS) {
    const mat = iso.level === 0 ? mIso0 : mIso;
    for (const ring of iso.rings) addLine(ring, 0.006, mat, gIso);
  }

  const ancientMat = new THREE.MeshBasicMaterial({
    color: 0xffe08a,
    toneMapped: false,
  });
  for (const site of ANCIENT) {
    const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.012, 0), ancientMat);
    mesh.position.copy(ll(site.lat, site.lng, R + 0.014));
    mesh.userData = { kind: "a" as PickKind, id: site.id };
    const pick = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    pick.position.copy(mesh.position);
    pick.userData = { kind: "a" as PickKind, id: site.id };
    gAncient.add(mesh, pick);
  }

  const missMat = new THREE.MeshBasicMaterial({
    color: 0xf0bf00,
    transparent: true,
    opacity: 0.9,
    toneMapped: false,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  for (const c of CLUSTERS) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 12), missMat);
    mesh.position.copy(ll(c.lat, c.lng, R + 0.018));
    mesh.userData = { kind: "m" as PickKind, id: c.id };
    const pick = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    pick.position.copy(mesh.position);
    pick.userData = { kind: "m" as PickKind, id: c.id };
    gMissing.add(mesh, pick);
  }

  const nodeColors: Record<string, number> = {
    keepaway: 0x9ff6ff,
    uso: 0x5ad7ff,
    "sphere-hub": 0xd7c6ff,
    watch: 0xc5d4e0,
    crop: 0xf2d48a,
  };
  type NodeRec = { mesh: THREE.Mesh; halo: THREE.Mesh; kind: string; id: string; siteId?: string };
  const nodeRecs: NodeRec[] = [];
  for (const n of NODES) {
    const color = nodeColors[n.kind] ?? 0xc5d4e0;
    const mat = new THREE.MeshBasicMaterial({ color, toneMapped: false });
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(n.kind === "keepaway" ? 0.016 : 0.01, 16, 12),
      mat,
    );
    mesh.position.copy(ll(n.lat, n.lng, R + 0.02));
    mesh.userData = { kind: "n" as PickKind, id: n.id };
    const pick = new THREE.Mesh(
      new THREE.SphereGeometry(n.kind === "keepaway" ? 0.055 : 0.042, 8, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    pick.position.copy(mesh.position);
    pick.userData = { kind: "n" as PickKind, id: n.id };
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(n.kind === "keepaway" ? 0.034 : 0.02, 12, 10),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: n.kind === "keepaway" ? 0.35 : 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    halo.position.copy(mesh.position);
    gNodes.add(halo, mesh, pick);
    nodeRecs.push({ mesh, halo, kind: n.kind, id: n.id, siteId: n.siteId });
  }

  const reportMat = new THREE.MeshBasicMaterial({
    color: 0xfff6d0,
    toneMapped: false,
  });
  let reportKey = "";

  const pickables: THREE.Object3D[] = [];
  const collectPicks = () => {
    pickables.length = 0;
    for (const g of [gFault, gLey, gAncient, gMissing, gNodes, gReports]) {
      if (!g.visible) continue;
      g.traverse((o) => {
        if (o.userData && o.userData.kind) pickables.push(o);
      });
    }
  };

  const composer = new EffectComposer(renderer);
  composer.setPixelRatio(pr);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(host.clientWidth, host.clientHeight),
    host.clientWidth < 700 ? 0.42 : 0.55,
    0.42,
    0.72,
  );
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const timer = new Timer();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hoverKey = "";
  let downX = 0;
  let downY = 0;
  let frame = 0;

  function resize() {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  function hitAt(ev: PointerEvent): GlobeHover {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    const obj = hits[0]?.object;
    if (!obj?.userData?.kind) return null;
    return { kind: obj.userData.kind as PickKind, id: String(obj.userData.id) };
  }

  const onMove = (ev: PointerEvent) => {
    const hit = hitAt(ev);
    const key = hit ? `${hit.kind}:${hit.id}` : "";
    renderer.domElement.style.cursor = hit ? "pointer" : "grab";
    if (key !== hoverKey) {
      hoverKey = key;
      onHover(hit);
    }
  };
  const onDown = (ev: PointerEvent) => {
    downX = ev.clientX;
    downY = ev.clientY;
    controls.autoRotate = false;
  };
  const onUp = (ev: PointerEvent) => {
    const moved = Math.hypot(ev.clientX - downX, ev.clientY - downY);
    if (moved < 6) onPick(hitAt(ev));
  };
  renderer.domElement.addEventListener("pointermove", onMove);
  renderer.domElement.addEventListener("pointerdown", onDown);
  renderer.domElement.addEventListener("pointerup", onUp);

  let state: GlobeState = {
    layers: new Set([1, 2, 3]),
    declination: true,
    faults: false,
    leys: false,
    ancient: true,
    missing: true,
    reports: [],
  };

  function apply(next: GlobeState) {
    state = next;
    g1.visible = next.layers.has(1);
    g2.visible = next.layers.has(2);
    g3.visible = next.layers.has(3);
    gFault.visible = next.faults;
    gLey.visible = next.leys;
    gIso.visible = next.declination;
    gAncient.visible = next.ancient;
    gMissing.visible = next.missing;
    for (const rec of nodeRecs) {
      const vis = nodeOn(rec.kind, next.layers);
      rec.mesh.visible = vis;
      rec.halo.visible = vis;
      const on = next.selectedId === rec.id || next.selectedId === rec.siteId;
      rec.mesh.scale.setScalar(on ? 1.65 : 1);
    }
    const key = next.reports.map((r) => r.id).join("|");
    if (key !== reportKey) {
      reportKey = key;
      for (const child of [...gReports.children]) {
        child.removeFromParent();
        const mesh = child as THREE.Mesh;
        mesh.geometry?.dispose();
      }
      for (const r of next.reports) {
        const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.01, 0), reportMat);
        mesh.position.copy(ll(r.lat, r.lng, R + 0.03));
        mesh.userData = { kind: "n" as PickKind, id: r.id };
        gReports.add(mesh);
      }
    }
    collectPicks();
  }

  function loop() {
    frame = requestAnimationFrame(loop);
    const dt = Math.min(timer.update().getDelta(), 0.1);
    void dt;
    const t = timer.getElapsed();
    for (const u of times) u.value = t;
    for (const rec of nodeRecs) {
      if (!rec.halo.visible) continue;
      const s = 1 + Math.sin(t * 1.6 + rec.mesh.position.x) * 0.12;
      rec.halo.scale.setScalar(s);
    }
    controls.update();
    composer.render();
  }
  loop();

  return {
    setState: apply,
    dispose: () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      controls.dispose();
      composer.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
