const KEY = "shadow-biome-reports";
const MAX = 24;
const MAX_BYTES = 1_400_000;

export type FieldReport = {
  id: string;
  createdAt: number;
  place: string;
  siteId?: string;
  lat?: number;
  lng?: number;
  date: string;
  kind: "sphere" | "figure" | "missing" | "other";
  notes: string;
  photoDataUrl?: string;
};

function read(): FieldReport[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FieldReport[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(rows: FieldReport[]) {
  localStorage.setItem(KEY, JSON.stringify(rows.slice(0, MAX)));
}

export function listReports(): FieldReport[] {
  return read().sort((a, b) => b.createdAt - a.createdAt);
}

export function addReport(input: Omit<FieldReport, "id" | "createdAt">): FieldReport {
  const photo =
    input.photoDataUrl && input.photoDataUrl.length > MAX_BYTES ? undefined : input.photoDataUrl;
  const row: FieldReport = {
    ...input,
    photoDataUrl: photo,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  write([row, ...read()]);
  return row;
}

export function removeReport(id: string) {
  write(read().filter((r) => r.id !== id));
}
