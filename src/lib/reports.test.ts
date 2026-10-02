import { test } from "node:test";
import assert from "node:assert/strict";
import { parseReports, rasterPhotoSchema, addReport } from "./reports.ts";
const valid = {
  id: "c953170d-19e1-4a82-bf25-d67ebf8d0a8d",
  createdAt: 1,
  place: "Public park",
  date: "2026-10-02",
  kind: "sphere",
  notes: "An observation",
  lat: 37,
  lng: -115,
};
test("saved notes reject malformed records and out-of-range geographic data", () => {
  assert.deepEqual(
    parseReports(
      JSON.stringify([
        null,
        { ...valid, lat: 91 },
        { ...valid, lng: 181 },
        { ...valid, createdAt: "oops" },
        valid,
      ]),
    ),
    [valid],
  );
  assert.deepEqual(parseReports("{bad"), []);
  assert.deepEqual(parseReports("x".repeat(4_000_001)), []);
});
test("photos allow bounded raster data and reject active or remote URLs", () => {
  assert.equal(rasterPhotoSchema.safeParse("data:image/png;base64,aGVsbG8=").success, true);
  for (const photo of [
    "javascript:alert(1)",
    "https://tracker.invalid/pixel.png",
    "data:image/svg+xml;base64,aGVsbG8=",
    "data:text/html;base64,aGVsbG8=",
  ]) {
    assert.equal(rasterPhotoSchema.safeParse(photo).success, false);
  }
  assert.deepEqual(
    parseReports(JSON.stringify([{ ...valid, photoDataUrl: "https://tracker.invalid/pixel.png" }])),
    [],
  );
});
test("invalid input is rejected before accessing browser storage", () => {
  assert.throws(() => addReport({ ...valid, notes: "", kind: "sphere" }), /Check the note/);
  assert.deepEqual(parseReports(JSON.stringify([{ ...valid, date: "2026-02-30" }])), []);
});
