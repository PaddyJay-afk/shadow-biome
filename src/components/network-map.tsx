import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ANCIENT } from "@/data/ancient";
import { FAULTS } from "@/data/faults";
import { LEYS } from "@/data/leys";
import { CLUSTERS } from "@/data/missing";
import { LAYER_META, NODES } from "@/data/network";
import { listReports } from "@/lib/reports";
import { cn } from "@/lib/utils";
import type { GlobeApi, GlobeHover, GlobeState } from "@/components/globe-engine";

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

export function NetworkMap({
  selectedId,
  onSelect,
  layers,
  showMissing = true,
  showReports = true,
  preset = "atlas",
  className,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<GlobeApi | null>(null);
  const [hover, setHover] = useState<GlobeHover>(null);
  const [ready, setReady] = useState(false);
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
      listReports()
        .filter((r) => r.lat != null && r.lng != null)
        .map((r) => ({ id: r.id, lat: r.lat as number, lng: r.lng as number })),
    );
  }, [showReports]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let dead = false;
    let dispose = () => {};
    void import("@/components/globe-engine").then(({ mountGlobe }) => {
      if (dead || !host.current) return;
      const mounted = mountGlobe(
        host.current,
        (hit) => setHover(hit),
        (hit) => {
          if (hit) onSelect?.(hit.id);
        },
      );
      api.current = mounted;
      dispose = mounted.dispose;
      setReady(true);
    });
    return () => {
      dead = true;
      api.current = null;
      dispose();
      setReady(false);
    };
    // mount once — selection flows through setState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const state: GlobeState = {
      layers: activeLayers,
      declination: on.declination,
      faults: on.faults,
      leys: on.leys,
      ancient: on.ancient,
      missing: on.missing,
      selectedId,
      reports: showReports ? reports : [],
    };
    api.current?.setState(state);
  }, [activeLayers, on, selectedId, reports, showReports, ready]);

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

  const hoverNode = hover?.kind === "n" ? NODES.find((n) => n.id === hover.id) : null;
  const hoverAncient = hover?.kind === "a" ? ANCIENT.find((s) => s.id === hover.id) : null;
  const hoverFault = hover?.kind === "f" ? FAULTS.find((s) => s.id === hover.id) : null;
  const hoverLey = hover?.kind === "l" ? LEYS.find((s) => s.id === hover.id) : null;
  const hoverMissing = hover?.kind === "m" ? CLUSTERS.find((s) => s.id === hover.id) : null;
  const selected = selectedId
    ? NODES.find((n) => n.id === selectedId || n.siteId === selectedId)
    : null;

  let tip: { kicker: string; name: string; to?: "/sites/$id" | "/ancient/$id"; id?: string } | null =
    null;
  if (hoverAncient)
    tip = {
      kicker: `ancient · D ${hoverAncient.declination >= 0 ? "+" : ""}${hoverAncient.declination.toFixed(1)}°`,
      name: hoverAncient.name,
      to: "/ancient/$id",
      id: hoverAncient.id,
    };
  else if (hoverFault) tip = { kicker: hoverFault.kind, name: hoverFault.name };
  else if (hoverLey) tip = { kicker: "ley", name: hoverLey.name };
  else if (hoverMissing) tip = { kicker: "missing", name: hoverMissing.name };
  else if (hoverNode)
    tip = {
      kicker: hoverNode.kind.replace("-", " "),
      name: hoverNode.name,
      to: hoverNode.siteId ? "/sites/$id" : undefined,
      id: hoverNode.siteId,
    };
  else if (selected)
    tip = {
      kicker: selected.kind.replace("-", " "),
      name: selected.name,
      to: selected.siteId ? "/sites/$id" : undefined,
      id: selected.siteId,
    };

  return (
    <div className={cn("relative overflow-hidden bg-bg", className)}>
      <div
        ref={host}
        className="absolute inset-0"
        role="img"
        aria-label="Three-dimensional globe of the Sphere Network, declination, faults, leys, and ancient sites"
      />
      {!ready ? (
        <p className="pointer-events-none absolute left-4 top-14 text-xs text-muted">Drawing globe…</p>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-bg/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />

      <div className="absolute left-3 top-3 z-10 flex max-w-[92%] flex-wrap gap-1">
        {([1, 2, 3] as const).map((layer) => (
          <button
            key={layer}
            type="button"
            onClick={() => toggleLayer(layer)}
            className={cn(
              "rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
              activeLayers.has(layer) ? "bg-accent text-accent-fg" : "bg-surface/80 text-muted",
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
                  ? "bg-danger text-white"
                  : key === "missing" || key === "leys" || key === "ancient"
                    ? "bg-warn text-accent-fg"
                    : "bg-accent text-accent-fg"
                : "bg-surface/80 text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-end justify-between gap-3">
        <div className="pointer-events-none max-w-sm rounded-lg bg-surface/80 px-3 py-2 shadow-[var(--shadow-border)] backdrop-blur-md">
          {tip ? (
            <>
              <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{tip.kicker}</p>
              <p className="text-lg font-medium leading-tight text-fg">{tip.name}</p>
            </>
          ) : (
            <p className="text-xs text-muted">
              Drag to orbit. Cyan fibers glow. Red-orange faults, gold leys, pale agonic line. Land stays dark.
            </p>
          )}
        </div>
        {tip?.to === "/ancient/$id" && tip.id ? (
          <Link
            to="/ancient/$id"
            params={{ id: tip.id }}
            className="pointer-events-auto inline-flex h-11 items-center rounded-md bg-cta px-4 text-sm font-medium text-cta-fg"
          >
            Open dossier
          </Link>
        ) : tip?.to === "/sites/$id" && tip.id ? (
          <Link
            to="/sites/$id"
            params={{ id: tip.id }}
            className="pointer-events-auto inline-flex h-11 items-center rounded-md bg-cta px-4 text-sm font-medium text-cta-fg"
          >
            Open dossier
          </Link>
        ) : null}
      </div>
    </div>
  );
}
