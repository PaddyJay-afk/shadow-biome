export function project(
  lat: number,
  lng: number,
  width: number,
  height: number,
): [number, number] {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
}

export function fiberPath(
  a: [number, number],
  b: [number, number],
  bend = 0.22,
): string {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const cx = mx + dy * bend;
  const cy = my - dx * bend;
  return `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
}

export function polylinePath(
  ring: [number, number][],
  width: number,
  height: number,
): string[] {
  const parts: string[] = [];
  let d = "";
  for (let i = 0; i < ring.length; i++) {
    const [x, y] = project(ring[i][0], ring[i][1], width, height);
    if (i === 0) {
      d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      continue;
    }
    const prev = ring[i - 1];
    if (Math.abs(ring[i][1] - prev[1]) > 180) {
      if (d) parts.push(d);
      d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    } else {
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  if (d) parts.push(d);
  return parts;
}
