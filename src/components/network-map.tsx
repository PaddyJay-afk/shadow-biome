import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ANCIENT } from "@/data/ancient";
import { CONTINENTS } from "@/data/continents";
import { FAULTS } from "@/data/faults";
import { ISOGONICS } from "@/data/isogonics";
import { GRID_MERIDIANS, GRID_PARALLELS, LEYS } from "@/data/leys";
import { CLUSTERS } from "@/data/missing";
import { FIBERS, LAYER_META, NODES, nodeById } from "@/data/network";
import { listReports } from "@/lib/reports";
import { fiberPath, polylinePath, project } from "@/lib/geo";
import { cn } from "@/lib/utils";

const W = 1000;
const H = 500;

type Overlay = "declination" | "faults" | "leys" | "ancient" | "missing";

type Props = {
  selectedId?: string;
  onSelect?: (id: string) => void;
  layers?: Set<1 | 2 | 3>;
  showMissing?: boolean;
  showReports?: boolean;
  preset?: "atlas" | "grid";
  className?: string;
};

type Tip = {
  kicker: string;
  name: string;
  to?: "/sites/$id" | "/ancient/$id";
  id?: string;
};

export function NetworkMap({
  selectedId,
  onSelect,
  layers,
  showMissing = true,
  showReports = true,
  preset = "atlas",
  className,
}: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const [ownLayers, setOwnLayers] = useState<Set<1 | 2 | 3>>(() => new Set([1, 2, 3]));
  const [on, setOn] = useState<Record<Overlay, boolean>>({
    declination: true,
    faults: preset === "grid",
    leys: preset === "grid",
    ancient: true,
    missing: showMissing,
  });
  const [reports, setReports] = useState<{ id: string; lat: number; lng: number }[]>([]);
  const activeLayers = layers ?? ownLayers;

  useEffect(() => {
    if (!showReports) return;
    setReports(
      listReports().filter((r): r is typeof r & { lat: number; lng: number } => r.lat != null && r.lng != null),
    );
  }, [showReports]);

  const land = useMemo(
    () =>
      CONTINENTS.map((c) => {
        const d = c.ring
          .map((pt, i) => {
            const [x, y] = project(pt[1], pt[0], W, H);
            return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
          })
          .join(" ");
        return { id: c.id, d: `${d} Z` };
      }),
    [],
  );

  const meridians = useMemo(() => {
    const lines: { id: string; d: string }[] = [];
    for (let lng = -180; lng <= 180; lng += 30) {
      const [x1] = project(90, lng, W, H);
      const [, y2] = project(-90, lng, W, H);
      lines.push({ id: `m${lng}`, d: `M ${x1} 0 L ${x1} ${y2}` });
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const [, y] = project(lat, 0, W, H);
      lines.push({ id: `p${lat}`, d: `M 0 ${y} L ${W} ${y}` });
    }
    return lines;
  }, []);

  const layerKey = [activeLayers.has(1), activeLayers.has(2), activeLayers.has(3)].join();
  const fibers = useMemo(
    () =>
      FIBERS.filter((f) => activeLayers.has(f.layer)).map((f, i) => {
        const a = nodeById(f.from);
        const b = nodeById(f.to);
        if (!a || !b) return null;
        const pa = project(a.lat, a.lng, W, H);
        const pb = project(b.lat, b.lng, W, H);
        return {
          key: `${f.from}-${f.to}-${i}`,
          d: fiberPath(pa, pb, 0.16 + (f.layer - 1) * 0.05),
          layer: f.layer,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layerKey],
  );

  const visibleNodes = NODES.filter((n) => {
    if (n.kind === "keepaway") return true;
    if (activeLayers.has(3) && (n.kind === "watch" || n.kind === "crop")) return true;
    if (activeLayers.has(2) && (n.kind === "uso" || n.kind === "sphere-hub")) return true;
    if (activeLayers.has(1) && n.kind === "sphere-hub") return true;
    return false;
  });

  const hoverNode = hover?.startsWith("n:") ? nodeById(hover.slice(2)) : null;
  const hoverAncient = hover?.startsWith("a:") ? ANCIENT.find((s) => s.id === hover.slice(2)) : null;
  const hoverFault = hover?.startsWith("f:") ? FAULTS.find((s) => s.id === hover.slice(2)) : null;
  const hoverLey = hover?.startsWith("l:") ? LEYS.find((s) => s.id === hover.slice(2)) : null;
  const selected = selectedId
    ? NODES.find((n) => n.id === selectedId || n.siteId === selectedId)
    : null;

  let tip: Tip | null = null;
  if (hoverAncient) tip = { kicker: `ancient · D ${hoverAncient.declination >= 0 ? "+" : ""}${hoverAncient.declination.toFixed(1)}°`, name: hoverAncient.name, to: "/ancient/$id", id: hoverAncient.id };
  else if (hoverFault) tip = { kicker: hoverFault.kind, name: hoverFault.name };
  else if (hoverLey) tip = { kicker: "ley", name: hoverLey.name };
  else if (hoverNode) tip = { kicker: hoverNode.kind.replace("-", " "), name: hoverNode.name, to: hoverNode.siteId ? "/sites/$id" : undefined, id: hoverNode.siteId };
  else if (selected) tip = { kicker: selected.kind.replace("-", " "), name: selected.name, to: selected.siteId ? "/sites/$id" : undefined, id: selected.siteId };

  function toggleLayer(layer: 1 | 2 | 3) {
    if (layers) return;
    setOwnLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) {
        if (next.size === 1) return prev;
        next.delete(layer);
      } else next.add(layer);
      return next;
    });
  }

  function toggle(key: Overlay) {
    setOn((s) => ({ ...s, [key]: !s[key] }));
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-bg", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="World map of Sphere Network, magnetic declination, faults, leys, and ancient sites"
      >
        <rect width={W} height={H} fill="#07090c" />
        {meridians.map((g) => (
          <path key={g.id} d={g.d} stroke="rgba(231,238,244,0.06)" strokeWidth="0.6" fill="none" />
        ))}
        {land.map((c) => (
          <path key={c.id} d={c.d} fill="rgba(126,224,242,0.06)" stroke="rgba(126,224,242,0.16)" strokeWidth="0.7" />
        ))}

        {on.leys
          ? GRID_MERIDIANS.map((lng) => {
              const [x] = project(0, lng, W, H);
              return (
                <path
                  key={`gm${lng}`}
                  d={`M ${x} 0 L ${x} ${H}`}
                  fill="none"
                  stroke="rgba(228,196,138,0.18)"
                  strokeWidth="0.6"
                  strokeDasharray="2 8"
                />
              );
            })
          : null}
        {on.leys
          ? GRID_PARALLELS.map((lat) => {
              const [, y] = project(lat, 0, W, H);
              return (
                <path
                  key={`gp${lat}`}
                  d={`M 0 ${y} L ${W} ${y}`}
                  fill="none"
                  stroke="rgba(228,196,138,0.14)"
                  strokeWidth="0.6"
                  strokeDasharray="2 8"
                />
              );
            })
          : null}
        {on.leys
          ? LEYS.flatMap((ley) =>
              polylinePath(ley.path, W, H).map((d, i) => (
                <path
                  key={`${ley.id}-${i}`}
                  d={d}
                  fill="none"
                  stroke="#e4c48a"
                  strokeWidth="1.05"
                  strokeOpacity="0.55"
                  className="cursor-pointer"
                  onMouseEnter={() => setHover(`l:${ley.id}`)}
                  onMouseLeave={() => setHover(null)}
                />
              )),
            )
          : null}

        {on.declination
          ? ISOGONICS.flatMap((iso) =>
              iso.rings.flatMap((ring, ri) =>
                polylinePath(ring, W, H).map((d, i) => (
                  <path
                    key={`iso-${iso.level}-${ri}-${i}`}
                    d={d}
                    fill="none"
                    stroke={iso.level === 0 ? "#9ff4ff" : "rgba(126,224,242,0.45)"}
                    strokeWidth={iso.level === 0 ? 1.6 : 0.7}
                    strokeOpacity={iso.level === 0 ? 0.9 : 0.55}
                    style={iso.level === 0 ? { filter: "drop-shadow(0 0 3px rgba(159,244,255,0.7))" } : undefined}
                  />
                )),
              ),
            )
          : null}

        {on.faults
          ? FAULTS.flatMap((f) =>
              polylinePath(f.path, W, H).map((d, i) => (
                <path
                  key={`${f.id}-${i}`}
                  d={d}
                  fill="none"
                  stroke="#e07a6a"
                  strokeWidth="1.7"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                  className="cursor-pointer"
                  style={{ filter: "drop-shadow(0 0 2px rgba(224,122,106,0.65))" }}
                  onMouseEnter={() => setHover(`f:${f.id}`)}
                  onMouseLeave={() => setHover(null)}
                />
              )),
            )
          : null}

        {fibers.map((f) =>
          f ? (
            <path
              key={f.key}
              d={f.d}
              fill="none"
              className="fiber-stroke"
              stroke={f.layer === 1 ? "#9ff4ff" : f.layer === 2 ? "#7ee0f2" : "#5c9eaa"}
              strokeWidth={f.layer === 1 ? 1.35 : f.layer === 2 ? 1.05 : 0.75}
              strokeOpacity={f.layer === 1 ? 0.85 : 0.65}
              strokeDasharray={f.layer === 1 ? "10 18" : f.layer === 2 ? "6 14" : "3 10"}
              style={{
                animation: "fiber-flow 9s linear infinite",
                filter: "drop-shadow(0 0 2px rgba(159,244,255,0.55))",
              }}
            />
          ) : null,
        )}

        {on.missing
          ? CLUSTERS.map((c) => {
              const [x, y] = project(c.lat, c.lng, W, H);
              return (
                <g key={`miss-${c.id}`} transform={`translate(${x} ${y})`}>
                  <circle r="5.5" fill="none" stroke="#e4c48a" strokeOpacity="0.7" strokeWidth="0.8" />
                  <circle r="1.6" fill="#e4c48a" />
                </g>
              );
            })
          : null}

        {reports.map((r) => {
          const [x, y] = project(r.lat, r.lng, W, H);
          return (
            <g key={`rep-${r.id}`} transform={`translate(${x} ${y})`}>
              <rect x="-2.2" y="-2.2" width="4.4" height="4.4" fill="#7ee0f2" transform="rotate(45)" />
            </g>
          );
        })}

        {on.ancient
          ? ANCIENT.map((s) => {
              const [x, y] = project(s.lat, s.lng, W, H);
              const isOn = hover === `a:${s.id}` || selectedId === s.id;
              return (
                <g
                  key={`anc-${s.id}`}
                  transform={`translate(${x} ${y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHover(`a:${s.id}`)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onSelect?.(s.id)}
                >
                  <rect
                    x="-2.6"
                    y="-2.6"
                    width="5.2"
                    height="5.2"
                    fill={isOn ? "#e7eef4" : "#e4c48a"}
                    stroke="#07090c"
                    strokeWidth="0.6"
                  />
                </g>
              );
            })
          : null}

        {visibleNodes.map((n) => {
          const [x, y] = project(n.lat, n.lng, W, H);
          const isKeep = n.kind === "keepaway";
          const isOn = selectedId === n.id || selectedId === n.siteId || hover === `n:${n.id}`;
          return (
            <g
              key={n.id}
              transform={`translate(${x} ${y})`}
              className="cursor-pointer"
              onMouseEnter={() => setHover(`n:${n.id}`)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect?.(n.id)}
            >
              {isKeep ? (
                <circle
                  r="10"
                  fill="rgba(126,224,242,0.18)"
                  className="node-halo origin-center"
                  style={{ animation: "node-pulse 3.6s ease-in-out infinite", transformOrigin: "center" }}
                />
              ) : null}
              <circle
                r={isKeep ? 3.4 : 2.1}
                fill={isOn ? "#e7eef4" : isKeep ? "#7ee0f2" : "#8b9aab"}
                stroke="#07090c"
                strokeWidth="0.8"
              />
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-bg/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />

      <div className="absolute left-3 top-3 flex max-w-[92%] flex-wrap gap-1">
        {([1, 2, 3] as const).map((layer) => (
          <button
            key={layer}
            type="button"
            onClick={() => toggleLayer(layer)}
            className={cn(
              "rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
              activeLayers.has(layer) ? "bg-accent text-accent-fg" : "bg-surface text-muted",
            )}
          >
            {LAYER_META[layer].name.split("—")[0].trim()}
          </button>
        ))}
        {(
          [
            ["declination", "D°"],
            ["faults", "Faults"],
            ["leys", "Leys"],
            ["ancient", "Ancient"],
            ["missing", "Missing"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => toggle(key)}
            className={cn(
              "rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
              on[key]
                ? key === "faults"
                  ? "bg-danger text-accent-fg"
                  : key === "missing" || key === "leys" || key === "ancient"
                    ? "bg-warn text-accent-fg"
                    : "bg-accent text-accent-fg"
                : "bg-surface text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-3">
        <div className="pointer-events-none max-w-sm rounded-lg bg-surface/90 px-3 py-2 shadow-[var(--shadow-border)]">
          {tip ? (
            <>
              <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{tip.kicker}</p>
              <p className="font-display text-lg leading-tight text-fg">{tip.name}</p>
            </>
          ) : (
            <p className="text-xs text-muted">
              Cyan = agonic (D=0). Red-orange = faults. Gold squares = ancient. Gold dashes = leys.
            </p>
          )}
        </div>
        {tip?.to === "/ancient/$id" && tip.id ? (
          <Link
            to="/ancient/$id"
            params={{ id: tip.id }}
            className="pointer-events-auto inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
          >
            Open dossier
          </Link>
        ) : tip?.to === "/sites/$id" && tip.id ? (
          <Link
            to="/sites/$id"
            params={{ id: tip.id }}
            className="pointer-events-auto inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
          >
            Open dossier
          </Link>
        ) : null}
      </div>
    </div>
  );
}
