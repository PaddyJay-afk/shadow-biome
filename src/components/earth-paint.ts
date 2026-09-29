/** Equirectangular Earth painted for the glass globe. Rings are [lng, lat]. */

type Ring = [number, number][];

export type Peak = { lat: number; lng: number; h: number; snow: boolean };

const DESERTS: Ring[] = [
  [
    [-16, 28], [-12, 33], [0, 35], [12, 33], [25, 32], [34, 30], [36, 22],
    [20, 16], [8, 18], [-6, 19], [-14, 21], [-16, 28],
  ],
  [
    [34, 30], [44, 32], [56, 27], [58, 22], [52, 16], [43, 13], [35, 18], [34, 30],
  ],
  [
    [44, 38], [52, 36], [62, 36], [64, 28], [56, 25], [48, 27], [44, 32], [44, 38],
  ],
  [
    [58, 44], [68, 46], [78, 44], [88, 48], [104, 46], [116, 44], [112, 38],
    [96, 36], [80, 36], [68, 40], [58, 44],
  ],
  [
    [118, -18], [128, -18], [142, -20], [146, -26], [140, -32], [128, -32],
    [120, -28], [116, -22], [118, -18],
  ],
  [
    [-118, 36], [-114, 38], [-108, 37], [-103, 32], [-106, 26], [-112, 25],
    [-116, 30], [-118, 36],
  ],
  [
    [-76, -16], [-70, -16], [-68, -24], [-70, -30], [-74, -28], [-76, -22], [-76, -16],
  ],
  [
    [14, -20], [22, -18], [26, -24], [24, -30], [16, -30], [13, -26], [14, -20],
  ],
];

const RANGES: Ring[] = [
  [
    [72, 36], [76, 34], [80, 31], [84, 29], [87, 28], [90, 28], [94, 28], [98, 29],
  ],
  [
    [-78, 8], [-78, 2], [-76, -6], [-74, -14], [-70, -18], [-68, -24], [-68, -32],
    [-70, -38], [-72, -45], [-72, -52],
  ],
  [
    [-140, 62], [-136, 60], [-122, 52], [-118, 48], [-114, 44], [-108, 40],
    [-106, 36], [-106, 32],
  ],
  [
    [-122, 49], [-122, 46], [-121, 44], [-122, 42], [-120, 40], [-119, 37],
  ],
  [
    [6, 45], [8, 46], [10, 47], [12, 47], [14, 47], [16, 46],
  ],
  [
    [-8, 31], [-2, 33], [2, 34], [6, 36], [8, 36],
  ],
  [
    [58, 64], [60, 58], [60, 54], [59, 50],
  ],
  [
    [38, 14], [39, 10], [40, 8], [39, 6],
  ],
  [
    [-84, 35], [-82, 36], [-80, 37], [-78, 38], [-76, 40],
  ],
  [
    [168, -44], [170, -45], [172, -44],
  ],
];

export const PEAKS: Peak[] = [
  { lat: 27.99, lng: 86.93, h: 0.085, snow: true },
  { lat: 28.6, lng: 83.9, h: 0.07, snow: true },
  { lat: 30.1, lng: 81.3, h: 0.055, snow: true },
  { lat: 35.9, lng: 76.5, h: 0.06, snow: true },
  { lat: 32.5, lng: 80.0, h: 0.05, snow: true },
  { lat: -32.65, lng: -70.01, h: 0.062, snow: true },
  { lat: -16.6, lng: -68.1, h: 0.05, snow: true },
  { lat: -9.1, lng: -77.6, h: 0.048, snow: true },
  { lat: -1.47, lng: -78.8, h: 0.05, snow: true },
  { lat: -39.3, lng: -71.9, h: 0.042, snow: true },
  { lat: -49.3, lng: -73.0, h: 0.04, snow: true },
  { lat: 39.0, lng: -106.4, h: 0.042, snow: true },
  { lat: 43.8, lng: -110.8, h: 0.04, snow: true },
  { lat: 48.7, lng: -113.7, h: 0.038, snow: true },
  { lat: 51.2, lng: -117.5, h: 0.036, snow: true },
  { lat: 36.6, lng: -118.3, h: 0.04, snow: true },
  { lat: 46.2, lng: -121.5, h: 0.038, snow: true },
  { lat: 48.5, lng: -121.1, h: 0.034, snow: true },
  { lat: 63.1, lng: -151.0, h: 0.055, snow: true },
  { lat: 61.0, lng: -140.0, h: 0.04, snow: true },
  { lat: 45.8, lng: 6.86, h: 0.036, snow: true },
  { lat: 46.5, lng: 10.5, h: 0.032, snow: true },
  { lat: 47.1, lng: 12.3, h: 0.03, snow: true },
  { lat: 43.4, lng: 42.4, h: 0.04, snow: true },
  { lat: 33.1, lng: -5.1, h: 0.028, snow: true },
  { lat: 31.1, lng: -7.9, h: 0.03, snow: true },
  { lat: 9.2, lng: 39.0, h: 0.03, snow: false },
  { lat: 3.07, lng: 37.35, h: 0.034, snow: false },
  { lat: 35.4, lng: 138.7, h: 0.032, snow: true },
  { lat: -43.6, lng: 170.1, h: 0.03, snow: true },
  { lat: 38.9, lng: -77.0, h: 0.02, snow: false },
  { lat: 35.6, lng: -83.5, h: 0.022, snow: false },
];

function project(lng: number, lat: number, w: number, h: number): [number, number] {
  return [((lng + 180) / 360) * w, ((90 - lat) / 180) * h];
}

function trace(ctx: CanvasRenderingContext2D, ring: Ring, w: number, h: number) {
  ring.forEach(([lng, lat], i) => {
    const [x, y] = project(lng, lat, w, h);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
}

function strokeRings(
  ctx: CanvasRenderingContext2D,
  rings: Ring[],
  w: number,
  h: number,
  color: string,
  width: number,
) {
  ctx.beginPath();
  for (const ring of rings) trace(ctx, ring, w, h);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.stroke();
}

function fillRings(ctx: CanvasRenderingContext2D, rings: Ring[], w: number, h: number, color: string) {
  ctx.beginPath();
  for (const ring of rings) trace(ctx, ring, w, h);
  ctx.fillStyle = color;
  ctx.fill();
}

export function paintEarth(continents: { id: string; ring: Ring }[]): HTMLCanvasElement {
  const w = 2560;
  const h = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("earth canvas");

  const ocean = ctx.createLinearGradient(0, 0, 0, h);
  ocean.addColorStop(0, "#d5e6f2");
  ocean.addColorStop(0.08, "#7eb0d4");
  ocean.addColorStop(0.22, "#1f6eab");
  ocean.addColorStop(0.5, "#0d5c9c");
  ocean.addColorStop(0.78, "#1a6eae");
  ocean.addColorStop(0.92, "#8ebcda");
  ocean.addColorStop(1, "#e7f1f8");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, w, h);

  const rings = continents.map((c) => c.ring);
  const ice = continents.filter((c) => c.id === "ant" || c.id === "gl").map((c) => c.ring);
  const land = continents.filter((c) => c.id !== "ant" && c.id !== "gl").map((c) => c.ring);

  strokeRings(ctx, rings, w, h, "#e4c99a", 26);
  strokeRings(ctx, rings, w, h, "#f7f5f0", 12);

  ctx.save();
  ctx.beginPath();
  for (const ring of land) trace(ctx, ring, w, h);
  ctx.clip();
  ctx.fillStyle = "#3f8a45";
  ctx.fillRect(0, 0, w, h);

  const yOf = (lat: number) => ((90 - lat) / 180) * h;
  ctx.fillStyle = "rgba(92, 122, 62, 0.55)";
  ctx.fillRect(0, yOf(70), w, yOf(48) - yOf(70));
  ctx.fillRect(0, yOf(-48), w, yOf(-70) - yOf(-48));
  ctx.fillStyle = "rgba(24, 110, 58, 0.4)";
  ctx.fillRect(0, yOf(12), w, yOf(-12) - yOf(12));

  ctx.fillStyle = "#e4c36a";
  ctx.beginPath();
  for (const ring of DESERTS) trace(ctx, ring, w, h);
  ctx.fill();
  ctx.globalAlpha = 0.72;
  ctx.fillStyle = "#b5522e";
  ctx.beginPath();
  for (const ring of DESERTS) {
    const shrunk = ring.map(([lng, lat]) => {
      const n = ring[Math.floor(ring.length / 2)];
      return [lng * 0.82 + n[0] * 0.18, lat * 0.82 + n[1] * 0.18] as [number, number];
    });
    trace(ctx, shrunk, w, h);
  }
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "#6d5344";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  for (const ring of RANGES) {
    ring.forEach(([lng, lat], i) => {
      const [x, y] = project(lng, lat, w, h);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
  }
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();

  fillRings(ctx, ice, w, h, "#f4f8fb");
  strokeRings(ctx, rings, w, h, "rgba(255,255,255,0.95)", 3);

  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let p = 0; p < d.length; p += 16) {
    const i = p / 4;
    const x = i % w;
    const y = (i / w) | 0;
    const n =
      Math.sin(x * 0.05) * Math.cos(y * 0.07) * 8 +
      Math.sin(x * 0.19 + y * 0.13) * 5;
    d[p] = Math.max(0, Math.min(255, d[p] + n));
    d[p + 1] = Math.max(0, Math.min(255, d[p + 1] + n * 0.85));
    d[p + 2] = Math.max(0, Math.min(255, d[p + 2] + n * 0.7));
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}
