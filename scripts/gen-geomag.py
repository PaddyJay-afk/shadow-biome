#!/usr/bin/env python3
"""Isogonic polylines from the geomag (WMM) evaluator."""
from __future__ import annotations

import math
from pathlib import Path

import geomag

SITES = {
    "giza": (29.9792, 31.1342),
    "ur": (30.9626, 46.1031),
    "uruk": (31.3259, 45.6360),
    "harappa": (30.6266, 72.8636),
    "mohenjo": (27.3292, 68.1389),
    "gobekli": (37.2231, 38.9224),
    "karahan": (37.0926, 39.2923),
    "baalbek": (34.0069, 36.2039),
    "derinkuyu": (38.3756, 34.9115),
    "catalhoyuk": (37.6670, 32.8283),
    "jericho": (31.8706, 35.4433),
    "petra": (30.3285, 35.4444),
    "stonehenge": (51.1789, -1.8262),
    "avebury": (51.4286, -1.8542),
    "newgrange": (53.6947, -6.4755),
    "carnac": (47.5947, -3.0797),
    "ggantija": (36.0472, 14.2690),
    "anyang": (36.1195, 114.3170),
    "xian": (34.2658, 108.9541),
    "angkor": (13.4125, 103.8670),
    "gunung-padang": (-6.9936, 107.0561),
    "yonaguni": (24.4340, 123.2580),
    "nan-madol": (6.8444, 158.3358),
    "teotihuacan": (19.6925, -98.8438),
    "cholula": (19.0577, -98.3019),
    "chichen": (20.6843, -88.5678),
    "la-venta": (18.1036, -94.0411),
    "sacsay": (-13.5075, -71.9817),
    "tiwanaku": (-16.5547, -68.6733),
    "caral": (-10.8917, -77.5214),
    "easter": (-27.1127, -109.3497),
    "poverty-point": (32.6368, -91.4063),
    "serpent-mound": (39.0259, -83.4301),
    "cahokia": (38.6550, -90.0618),
    "chaco": (36.0600, -107.9608),
    "great-zimbabwe": (-20.2686, 30.9334),
    "lalibela": (12.0319, 39.0434),
    "osirion": (26.1844, 31.9189),
    "longyou": (29.1740, 119.1790),
    "merida": (20.9674, -89.5926),
    "nttr": (37.2431, -115.7930),
    "dulce": (36.9334, -106.9986),
    "china-lake": (35.6854, -117.6904),
    "uttr": (40.1994, -112.9378),
    "anwr": (70.0500, -143.0000),
    "skinwalker": (40.2480, -109.6520),
    "white-sands": (32.3865, -106.4907),
    "inl": (43.5110, -112.9470),
}


def D(lat, lon):
    return float(geomag.declination(lat, lon))


print("Site D:")
for k, (la, lo) in SITES.items():
    d = D(la, lo)
    print(f"  {k:16s} {d:+7.2f}  {'NEAR0' if abs(d) < 5 else ''}")

lats = list(range(-78, 79, 2))
lons = list(range(-180, 181, 2))
grid = [[D(lat, lon) for lon in lons] for lat in lats]


def marching(level: float):
    segs = []
    ny, nx = len(lats), len(lons)

    def interp(a, va, b, vb):
        if abs(vb - va) < 1e-12:
            return a
        t = (level - va) / (vb - va)
        return a + t * (b - a)

    for i in range(ny - 1):
        for j in range(nx - 1):
            if lons[j + 1] <= lons[j]:
                continue
            v = [grid[i][j], grid[i][j + 1], grid[i + 1][j + 1], grid[i + 1][j]]
            if max(v) - min(v) > 25:
                continue
            p = [
                (lats[i], lons[j]),
                (lats[i], lons[j + 1]),
                (lats[i + 1], lons[j + 1]),
                (lats[i + 1], lons[j]),
            ]
            hits = []
            for a, b in ((0, 1), (1, 2), (2, 3), (3, 0)):
                va, vb = v[a], v[b]
                if (va - level) * (vb - level) < 0:
                    hits.append((interp(p[a][0], va, p[b][0], vb), interp(p[a][1], va, p[b][1], vb)))
            if len(hits) >= 2:
                segs.append((hits[0], hits[1]))

    unused = segs[:]
    lines = []
    while unused:
        a, b = unused.pop()
        line = [a, b]
        changed = True
        while changed:
            changed = False
            for k, (p, q) in enumerate(unused):
                end, start = line[-1], line[0]

                def close(u, v):
                    return abs(u[0] - v[0]) < 0.08 and abs(u[1] - v[1]) < 0.08

                if close(end, p):
                    line.append(q); unused.pop(k); changed = True; break
                if close(end, q):
                    line.append(p); unused.pop(k); changed = True; break
                if close(start, q):
                    line.insert(0, p); unused.pop(k); changed = True; break
                if close(start, p):
                    line.insert(0, q); unused.pop(k); changed = True; break
        if len(line) >= 6:
            lines.append(line)
    return lines


def simplify(pts, eps=0.45):
    if len(pts) < 3:
        return pts

    def dperp(a, b, p):
        x1, y1 = a[1], a[0]
        x2, y2 = b[1], b[0]
        x0, y0 = p[1], p[0]
        dx, dy = x2 - x1, y2 - y1
        if dx == 0 and dy == 0:
            return math.hypot(x0 - x1, y0 - y1)
        t = max(0, min(1, ((x0 - x1) * dx + (y0 - y1) * dy) / (dx * dx + dy * dy)))
        return math.hypot(x0 - (x1 + t * dx), y0 - (y1 + t * dy))

    def rec(seq):
        if len(seq) < 3:
            return seq
        a, b = seq[0], seq[-1]
        dmax, idx = -1.0, 0
        for i in range(1, len(seq) - 1):
            d = dperp(a, b, seq[i])
            if d > dmax:
                dmax, idx = d, i
        if dmax > eps:
            return rec(seq[: idx + 1])[:-1] + rec(seq[idx:])
        return [a, b]

    return rec(pts)


levels = [0, 5, -5, 10, -10, 15, -15]
out = {}
for lv in levels:
    raw = marching(float(lv))
    simp = [simplify(l) for l in raw]
    simp = [l for l in simp if len(l) >= 4]
    out[lv] = simp
    print(f"level {lv:+d}: {len(simp)} lines, {sum(len(l) for l in simp)} pts")


def fmt(l):
    return "[" + ",".join(f"[{lat:.2f},{lon:.2f}]" for lat, lon in l) + "]"


body = []
body.append("/** Isogonic polylines from WMM (geomag/WMM.COF). [lat, lng][]. */")
body.append("export type IsoLine = { level: number; rings: [number, number][][] };")
body.append("")
body.append("export const ISOGONICS: IsoLine[] = [")
for lv in levels:
    rings = ",".join(fmt(l) for l in out[lv])
    body.append(f"  {{ level: {lv}, rings: [{rings}] }},")
body.append("];")
body.append("")
body.append("export const SITE_DECLINATION: Record<string, number> = {")
for k, (la, lo) in SITES.items():
    body.append(f'  "{k}": {D(la, lo):.2f},')
body.append("};")
body.append("")
body.append("export const WMM_NOTE =")
body.append(
    '  "Declination from the World Magnetic Model (WMM coefficients bundled with geomag). '
    "The heavy contour is the agonic — where a compass points at true north. It is not stationary. "
    "Barnhart’s Yucatán / Harappa / Angkor sit within about 2° of it; Giza sits near +5°, not on it.\";"
)
path = Path("/workspace/src/data/isogonics.ts")
path.write_text("\n".join(body) + "\n")
print("wrote", path, path.stat().st_size)
