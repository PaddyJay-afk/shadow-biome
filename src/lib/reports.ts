import { z } from "zod";

const KEY = "shadow-biome-reports";
const MAX = 24;
const MAX_PHOTO_BYTES = 1_400_000;
const MAX_STORAGE_BYTES = 4_000_000;

// Raster data only: no remote tracking URLs, SVG payloads, or arbitrary schemes.
export const rasterPhotoSchema = z
  .string()
  .max(MAX_PHOTO_BYTES)
  .regex(/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/);
const inputSchema = z.object({
  place: z.string().trim().min(1).max(200),
  siteId: z
    .string()
    .regex(/^[a-z0-9-]{1,80}$/)
    .optional(),
  lat: z.number().finite().min(-90).max(90).optional(),
  lng: z.number().finite().min(-180).max(180).optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((value) => {
      const d = new Date(value);
      return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
    }),
  kind: z.enum(["sphere", "figure", "missing", "other"]),
  notes: z.string().trim().min(1).max(12000),
  photoDataUrl: rasterPhotoSchema.optional(),
});
const reportSchema = inputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.number().finite().nonnegative(),
});
export type FieldReport = z.infer<typeof reportSchema>;

export function parseReports(raw: string): FieldReport[] {
  if (raw.length > MAX_STORAGE_BYTES) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX).flatMap((row) => {
      const result = reportSchema.safeParse(row);
      return result.success ? [result.data] : [];
    });
  } catch {
    return [];
  }
}
function read(): FieldReport[] {
  if (typeof window === "undefined") return [];
  try {
    return parseReports(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
function write(rows: FieldReport[]) {
  const serialized = JSON.stringify(rows.slice(0, MAX));
  if (serialized.length > MAX_STORAGE_BYTES)
    throw new Error(
      "The local archive is full. Remove an older photo or save this note without a still.",
    );
  try {
    localStorage.setItem(KEY, serialized);
  } catch {
    throw new Error(
      "This browser could not save the note. Storage may be full or disabled. Remove an older photo and try again.",
    );
  }
  window.dispatchEvent(new Event("shadow-biome-reports"));
}
export function listReports(): FieldReport[] {
  return read().sort((a, b) => b.createdAt - a.createdAt);
}
export function addReport(input: Omit<FieldReport, "id" | "createdAt">): FieldReport {
  const validated = inputSchema.safeParse(input);
  if (!validated.success)
    throw new Error(
      "Check the note: place is limited to 200 characters, notes to 12,000, and stills must be JPEG, PNG, or WebP under 1 MB.",
    );
  const row = { ...validated.data, id: crypto.randomUUID(), createdAt: Date.now() };
  write([row, ...read()]);
  return row;
}
export function removeReport(id: string) {
  write(read().filter((r) => r.id !== id));
}
