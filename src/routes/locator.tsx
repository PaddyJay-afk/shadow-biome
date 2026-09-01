import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteCard } from "@/components/site-card";
import { SCORE_KEYS } from "@/data/sites";
import { DEFAULT_WEIGHTS, rankSites } from "@/data/locator";
import type { LocatorWeights, ScoreKey } from "@/data/types";
import { CONDITIONS } from "@/data/theory";

export const Route = createFileRoute("/locator")({ component: LocatorPage });

function LocatorPage() {
  const [weights, setWeights] = useState<LocatorWeights>(DEFAULT_WEIGHTS);
  const [primaryOnly, setPrimaryOnly] = useState(false);
  const ranked = useMemo(() => rankSites(weights, primaryOnly), [weights, primaryOnly]);

  function setKey(key: ScoreKey, value: number) {
    setWeights((w) => ({ ...w, [key]: value }));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Habitat model</p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">Where would they be</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Weight the six conditions Jackson’s biology plus the keep-away claim actually imply. The
        list re-ranks in place. Default weights favor closed access and subsurface volume over raw
        folklore.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <aside className="h-fit rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <label className="flex items-center gap-2 text-sm text-fg">
            <input
              type="checkbox"
              checked={primaryOnly}
              onChange={(e) => setPrimaryOnly(e.target.checked)}
              className="size-4 accent-accent"
            />
            Primary seven only
          </label>
          <div className="mt-5 grid gap-4">
            {SCORE_KEYS.map(({ key, label }) => (
              <label key={key} className="grid gap-1">
                <span className="flex items-center justify-between text-sm text-muted">
                  {label}
                  <span className="font-mono tabular-nums text-fg">{weights[key]}</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weights[key]}
                  onChange={(e) => setKey(key, Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            className="mt-5 text-sm text-accent"
            onClick={() => setWeights(DEFAULT_WEIGHTS)}
          >
            Reset weights
          </button>
        </aside>

        <div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {ranked.map((site, i) => (
              <li key={site.id} className="relative">
                <span className="absolute left-3 top-3 z-10 font-mono text-xs text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <SiteCard site={site} score={site.locator} />
              </li>
            ))}
          </ol>
        </div>
      </div>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        {CONDITIONS.map((c) => (
          <article key={c.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-xl text-fg">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
