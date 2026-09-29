import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ANCIENT } from "@/data/ancient";
import { FAULTS } from "@/data/faults";
import { LEYS } from "@/data/leys";
import { CLUSTERS } from "@/data/missing";
import { LAYER_META, NODES } from "@/data/network";
import { listReports } from "@/lib/reports";
import { cn } from "@/lib/utils";
import { placeCard } from "@/data/place-card";
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
  const [picked, setPicked] = useState<GlobeHover>(null);
  const [shot, setShot] = useState("");
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
    void import("@/components/globe-engine").then((mod) => {
      if (dead || !host.current) return;
      const mounted = mod.mountGlobe(
        host.current,
        (hit) => setHover(hit),
        (hit) => {
          if (!hit) return;
          setPicked(hit);
          onSelect?.(hit.id);
          const card = placeCard(hit.kind, hit.id);
          setShot(card ? mod.placeSnapshot(card.lat, card.lng) : "");
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

  const card = picked ? placeCard(picked.kind, picked.id) : null;

  let tip: { kicker: string; name: string } | null = null;
  if (!card && hoverAncient) tip = { kicker: "ancient", name: hoverAncient.name };
  else if (!card && hoverFault) tip = { kicker: hoverFault.kind, name: hoverFault.name };
  else if (!card && hoverLey) tip = { kicker: "ley", name: hoverLey.name };
  else if (!card && hoverMissing) tip = { kicker: "missing", name: hoverMissing.name };
  else if (!card && hoverNode) tip = { kicker: hoverNode.kind.replace("-", " "), name: hoverNode.name };
  else if (!card && selected)
    tip = { kicker: selected.kind.replace("-", " "), name: selected.name };

  return (
    <div className={cn("relative overflow-hidden bg-bg", className)}>
      <div
        ref={host}
        className="absolute inset-0"
        role="img"
        aria-label="Glass globe of the Earth with the Sphere Network. Click a place for pictures and a description."
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
        <div className="pointer-events-none max-w-sm rounded-md bg-surface/85 px-3 py-2 shadow-[var(--shadow-border)] backdrop-blur-md">
          {tip ? (
            <>
              <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{tip.kicker}</p>
              <p className="text-sm font-medium leading-tight text-fg">{tip.name}</p>
            </>
          ) : (
            <p className="text-xs text-muted">
              Drag to turn the Earth. One finger turns it. Two fingers zoom. Click a mark for pictures and a note.
            </p>
          )}
        </div>
      </div>

      {card ? (
        <aside className="absolute bottom-3 right-3 top-14 z-20 flex w-[min(24rem,calc(100%-1.5rem))] flex-col overflow-hidden rounded-md bg-surface/95 shadow-[var(--shadow-border)] backdrop-blur-md max-md:left-3 max-md:top-auto max-md:max-h-[58%]">
          <div className="flex items-start justify-between gap-3 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{card.kicker}</p>
            <button
              type="button"
              onClick={() => setPicked(null)}
              className="text-xs text-muted"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1 px-3">
            {shot ? (
              <img src={shot} alt={`Map view centered on ${card.title}`} className="col-span-2 h-28 w-full rounded-sm object-cover" />
            ) : null}
            {card.images.slice(0, shot ? 1 : 3).map((img) => (
              <img key={img.src + img.alt} src={img.src} alt={img.alt} className="h-28 w-full rounded-sm object-cover" />
            ))}
          </div>
          {card.images.length > 1 ? (
            <div className="mt-1 grid grid-cols-2 gap-1 px-3">
              {card.images.slice(shot ? 1 : 3, shot ? 3 : 5).map((img) => (
                <img key={img.src + img.alt} src={img.src} alt={img.alt} className="h-24 w-full rounded-sm object-cover" />
              ))}
            </div>
          ) : null}
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
            <h2 className="text-lg text-fg">{card.title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{card.text}</p>
          </div>
          {card.link ? (
            <div className="px-3 py-3">
              <Link
                to={card.link.to}
                params={{ id: card.link.id }}
                className="inline-flex h-9 items-center rounded-md bg-accent px-3 text-[13px] font-medium text-accent-fg"
              >
                Open the full file
              </Link>
            </div>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}
