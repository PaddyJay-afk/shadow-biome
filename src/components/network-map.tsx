import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Layers3,
  Minus,
  Plus,
  RotateCcw,
  Pause,
  Play,
  Globe2,
  Map,
  ChevronDown,
  Crosshair,
} from "lucide-react";
import { ANCIENT } from "@/data/ancient";
import { FAULTS } from "@/data/faults";
import { ISOGONICS } from "@/data/isogonics";
import { LEYS } from "@/data/leys";
import { CLUSTERS } from "@/data/missing";
import { FIBERS, NODES, nodeById } from "@/data/network";
import { listReports } from "@/lib/reports";
import { cn } from "@/lib/utils";
import { FlatNetworkMap } from "./flat-network-map";
import type { createGlobeScene, GlobeMarker, GlobeLine, GlobeState } from "./globe-scene";

type Props = {
  selectedId?: string;
  onSelect?: (id: string) => void;
  layers?: Set<1 | 2 | 3>;
  showMissing?: boolean;
  showReports?: boolean;
  preset?: "atlas" | "grid";
  className?: string;
};
type Overlay = "declination" | "faults" | "leys" | "ancient" | "missing";
const OVERLAYS: [Overlay, string, string][] = [
  ["declination", "Magnetics", "Magnetic declination contours; cyan highlights zero declination."],
  ["faults", "Fault lines", "Schematic geological faults, shown in coral."],
  ["leys", "Ley model", "Hypothesized ley connections, shown in amber; not established geology."],
  ["ancient", "Ancient sites", "Archaeological sites, shown as amber diamonds."],
  [
    "missing",
    "Missing clusters",
    "Published case clusters, shown as amber rings; no causal inference.",
  ],
];

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
  const engine = useRef<ReturnType<typeof createGlobeScene> | null>(null);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;
  const [picked, setPicked] = useState<string>();
  const [ownLayers, setOwnLayers] = useState<Set<1 | 2 | 3>>(() => new Set([1, 2, 3]));
  const [overlays, setOverlays] = useState<Record<Overlay, boolean>>({
    declination: true,
    faults: preset === "grid",
    leys: preset === "grid",
    ancient: true,
    missing: showMissing,
  });
  const [opacity, setOpacity] = useState(88);
  const [rotating, setRotating] = useState(false);
  const [mode, setMode] = useState<"globe" | "flat">("globe");
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [panel, setPanel] = useState(false);
  const [reports, setReports] = useState<ReturnType<typeof listReports>>([]);
  const active = layers ?? ownLayers;
  const activeKey = [...active].sort().join();
  const selected = selectedId ?? picked;
  const selection = selected
    ? NODES.find((n) => n.id === selected || n.siteId === selected)
    : undefined;
  const ancient = ANCIENT.find((n) => `ancient:${n.id}` === selected || n.id === selected);

  useEffect(() => {
    if (!showReports) return;
    const refresh = () => setReports(listReports());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("shadow-biome-reports", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("shadow-biome-reports", refresh);
    };
  }, [showReports]);

  const state = useMemo<GlobeState>(() => {
    const visible = NODES.filter(
      (n) =>
        n.kind === "keepaway" ||
        (active.has(3) && (n.kind === "watch" || n.kind === "crop")) ||
        ((active.has(1) || active.has(2)) && n.kind === "sphere-hub") ||
        (active.has(2) && n.kind === "uso"),
    );
    const markers: GlobeMarker[] = visible.map((n) => ({
      ...n,
      color: n.kind === "keepaway" ? "#7ef0f5" : "#67aabf",
      primary: n.kind === "keepaway",
      shape: "node",
    }));
    if (overlays.ancient)
      markers.push(
        ...ANCIENT.map((n) => ({
          ...n,
          id: `ancient:${n.id}`,
          color: "#e9bc76",
          shape: "ancient" as const,
        })),
      );
    if (overlays.missing && showMissing)
      markers.push(
        ...CLUSTERS.map((n) => ({
          ...n,
          id: `missing:${n.id}`,
          color: "#e9bc76",
          shape: "missing" as const,
        })),
      );
    if (showReports)
      markers.push(
        ...reports
          .filter((r) => r.lat != null && r.lng != null)
          .map((r) => ({
            id: `report:${r.id}`,
            name: r.place,
            lat: r.lat!,
            lng: r.lng!,
            color: "#bcf5df",
            shape: "report" as const,
          })),
      );
    const lines: GlobeLine[] = FIBERS.filter((f) => active.has(f.layer)).flatMap((f) => {
      const a = nodeById(f.from),
        b = nodeById(f.to);
      return a && b
        ? [
            {
              points: [
                [a.lng, a.lat],
                [b.lng, b.lat],
              ] as [number, number][],
              color: f.layer === 1 ? "#7feff7" : f.layer === 2 ? "#429aae" : "#396779",
              arc: true,
            },
          ]
        : [];
    });
    if (overlays.declination)
      lines.push(
        ...ISOGONICS.flatMap((iso) =>
          iso.rings.map((ring) => ({
            points: ring,
            color: iso.level === 0 ? "#9ff4ff" : "#284b5c",
          })),
        ),
      );
    if (overlays.faults) lines.push(...FAULTS.map((f) => ({ points: f.path, color: "#ef8b7c" })));
    if (overlays.leys) lines.push(...LEYS.map((l) => ({ points: l.path, color: "#e9bc76" })));
    return {
      markers,
      lines,
      selected: selection?.id ?? (ancient ? `ancient:${ancient.id}` : selected),
      opacity: 0.88,
      rotating: false,
    };
    // The value key tracks externally supplied Sets, including in-place changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, overlays, reports, selected, showMissing, showReports]);
  const sceneState = useMemo(
    () => ({ ...state, opacity: opacity / 100, rotating }),
    [state, opacity, rotating],
  );
  const tip = selection ?? ancient ?? state.markers.find((m) => m.id === selected);
  const latest = useRef(sceneState);
  latest.current = sceneState;

  useEffect(() => {
    if (mode !== "globe") return;
    let cancelled = false;
    setStatus("loading");
    import("./globe-scene")
      .then(({ createGlobeScene }) => {
        if (cancelled || !host.current) return;
        try {
          engine.current = createGlobeScene(
            host.current,
            (id) => {
              setPicked(id);
              selectRef.current?.(id.startsWith("ancient:") ? id.slice(8) : id);
            },
            () => {
              if (!cancelled) {
                setStatus("failed");
                setMode("flat");
              }
            },
          );
          engine.current.update(latest.current);
          setStatus("ready");
        } catch {
          setStatus("failed");
          setMode("flat");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("failed");
          setMode("flat");
        }
      });
    return () => {
      cancelled = true;
      engine.current?.dispose();
      engine.current = null;
    };
  }, [mode]);
  useEffect(() => {
    engine.current?.update(sceneState);
  }, [sceneState]);

  function choose(id: string) {
    setPicked(id);
    onSelect?.(id.startsWith("ancient:") ? id.slice(8) : id);
  }
  function toggleLayer(layer: 1 | 2 | 3) {
    if (layers) return;
    setOwnLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) next.delete(layer);
      else next.add(layer);
      return next;
    });
  }

  return (
    <section className={cn("atlas-console", className)} aria-label="Interactive research atlas">
      <div className="atlas-topbar">
        <div className="atlas-title">
          <Crosshair size={16} />
          <span>PLANETARY ATLAS</span>
          <span className="atlas-version">/ 01</span>
        </div>
        <span className="atlas-status">
          <i /> RESEARCH MODEL
        </span>
      </div>
      <div className="atlas-stage">
        {mode === "globe" ? (
          <>
            <div
              ref={host}
              className="globe-host"
              role="img"
              aria-label="Three-dimensional Earth with research sites and hypothesized connections. Use the site selector and view buttons for keyboard access."
            />
            {status === "loading" && (
              <div className="atlas-loading" role="status">
                Initializing Earth…
              </div>
            )}
            <div className="atlas-coordinate">
              <span>REFERENCE SYSTEM</span>
              <strong>WGS 84 · GLOBAL</strong>
              <span>SURFACE + NETWORK</span>
            </div>
            <div className="atlas-reticle" aria-hidden="true" />
            <div className="atlas-scale" aria-hidden="true">
              90° N<br />—<br />
              0°
              <br />—<br />
              90° S
            </div>
            <div className="atlas-gesture">Drag to orbit · pinch to zoom</div>
            <div className="atlas-view-controls">
              <button aria-label="Zoom in" onClick={() => engine.current?.zoom(0.85)}>
                <Plus size={17} />
              </button>
              <button aria-label="Zoom out" onClick={() => engine.current?.zoom(1.18)}>
                <Minus size={17} />
              </button>
              <button
                aria-label="Reset Earth view"
                onClick={() => {
                  setPicked(undefined);
                  engine.current?.reset();
                }}
              >
                <RotateCcw size={16} />
              </button>
              <button
                aria-label={rotating ? "Pause rotation" : "Rotate Earth"}
                aria-pressed={rotating}
                onClick={() => setRotating((v) => !v)}
              >
                {rotating ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </>
        ) : (
          <div className="atlas-flat">
            <FlatNetworkMap
              selectedId={selected}
              onSelect={choose}
              layers={layers}
              showMissing={showMissing}
              showReports={showReports}
              preset={preset}
            />
          </div>
        )}
        <div className="atlas-mode" role="group" aria-label="Map view">
          <button aria-pressed={mode === "globe"} onClick={() => setMode("globe")}>
            <Globe2 size={14} /> 3D Earth
          </button>
          <button aria-pressed={mode === "flat"} onClick={() => setMode("flat")}>
            <Map size={14} /> 2D Map
          </button>
        </div>
        {mode === "globe" && (
          <aside className="atlas-readout" aria-live="polite">
            <span className="atlas-eyebrow">{tip ? "SELECTED RECORD" : "OBSERVATION INDEX"}</span>
            <strong>{tip?.name ?? "Patterns beneath the surface."}</strong>
            <span>
              {tip
                ? `${Math.abs(tip.lat).toFixed(3)}° ${tip.lat >= 0 ? "N" : "S"} / ${Math.abs(tip.lng).toFixed(3)}° ${tip.lng >= 0 ? "E" : "W"}`
                : `${NODES.length} mapped nodes · ${FIBERS.length} proposed links`}
            </span>
            {selection?.siteId ? (
              <Link to="/sites/$id" params={{ id: selection.siteId }}>
                Open dossier ↗
              </Link>
            ) : ancient ? (
              <Link to="/ancient/$id" params={{ id: ancient.id }}>
                Open dossier ↗
              </Link>
            ) : null}
          </aside>
        )}
      </div>
      {status === "failed" && (
        <p className="atlas-fallback" role="status">
          3D is unavailable on this device. The 2D atlas remains available.
        </p>
      )}
      <div className="atlas-toolbar">
        <label className="atlas-select">
          <span>FOCUS SITE</span>
          <select
            aria-label="Focus research site"
            value={selection?.id ?? (ancient ? `ancient:${ancient.id}` : "")}
            onChange={(e) => choose(e.target.value)}
          >
            <option value="">Explore the globe</option>
            {NODES.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
            {ANCIENT.map((n) => (
              <option key={n.id} value={`ancient:${n.id}`}>
                {n.name} · ancient
              </option>
            ))}
          </select>
        </label>
        {mode === "globe" && (
          <button
            className="atlas-layer-toggle"
            aria-expanded={panel}
            aria-controls="atlas-layers"
            onClick={() => setPanel((v) => !v)}
          >
            <Layers3 size={17} /> Layers{" "}
            <ChevronDown size={14} className={panel ? "rotate-180" : ""} />
          </button>
        )}
        {mode === "globe" && (
          <label className="atlas-opacity">
            <span>
              EARTH OPACITY <b>{opacity}%</b>
            </span>
            <input
              aria-label="Earth opacity"
              type="range"
              min={20}
              max={100}
              step={1}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
            />
          </label>
        )}
      </div>
      {panel && mode === "globe" && (
        <div id="atlas-layers" className="atlas-layers">
          <div>
            <span className="atlas-eyebrow">PROPOSED SPHERE NETWORK</span>
            <div className="atlas-chips">
              {([1, 2, 3] as const).map((l) => (
                <button
                  key={l}
                  disabled={Boolean(layers)}
                  aria-pressed={active.has(l)}
                  onClick={() => toggleLayer(l)}
                >
                  Type {l}
                  <span>{l === 1 ? "Global" : l === 2 ? "Regional" : "Local"}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="atlas-eyebrow">CONTEXT OVERLAYS</span>
            <div className="atlas-chips">
              {OVERLAYS.filter(([key]) => key !== "missing" || showMissing).map(
                ([key, label, description]) => (
                  <button
                    key={key}
                    title={description}
                    aria-pressed={overlays[key]}
                    onClick={() => setOverlays((v) => ({ ...v, [key]: !v[key] }))}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>
          <p>
            Connections illustrate a hypothesis, not tracked objects or verified infrastructure.
            Coordinates and geological lines are approximate.
          </p>
        </div>
      )}
      <div className="atlas-legend">
        <span>
          <i className="legend-node" /> Research node
        </span>
        <span>
          <i className="legend-ancient" /> Ancient site
        </span>
        <span>
          <i className="legend-line" /> Hypothesized link
        </span>
        <span className="atlas-legend-note">ILLUSTRATIVE · NOT LIVE INTELLIGENCE</span>
      </div>
    </section>
  );
}
