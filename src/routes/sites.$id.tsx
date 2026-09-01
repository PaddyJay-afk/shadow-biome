import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Disclaimer } from "@/components/disclaimer";
import { ScoreBar } from "@/components/score-bar";
import { Badge } from "@/components/ui/badge";
import { NetworkMap } from "@/components/network-map";
import { ACCESS_LABEL, SCORE_KEYS, SITES, overallScore, siteById } from "@/data/sites";
import { sourceById } from "@/data/sources";

export const Route = createFileRoute("/sites/$id")({
  loader: ({ params }) => {
    const site = siteById(params.id);
    if (!site) throw notFound();
    return { site };
  },
  component: SitePage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl text-fg">No such range</h1>
      <Link to="/keepaway" className="mt-4 inline-flex h-11 items-center text-sm text-accent">
        Back to the seven
      </Link>
    </main>
  ),
});

function SitePage() {
  const { site } = Route.useLoaderData();
  const score = overallScore(site.scores);
  const hero = site.id === "anwr" || site.id === "glacier-bay" ? "/art/cavern.jpg" : "/art/range.jpg";

  return (
    <main>
      <div className="relative">
        <img
          src={hero}
          alt=""
          className="h-56 w-full object-cover md:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{site.region}</p>
          <h1 className="mt-2 font-display text-4xl text-fg md:text-5xl">{site.name}</h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article>
          <div className="flex flex-wrap gap-2">
            <Badge tone={site.primary ? "accent" : "muted"}>{site.primary ? "Primary keep-away" : "Watchlist"}</Badge>
            <Badge tone="warn">{ACCESS_LABEL[site.access]}</Badge>
            <Badge>Score {score}</Badge>
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted">{site.summary}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Closed access</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.restrictionNote}</p>
          <p className="mt-2 font-mono text-xs text-subtle">{site.acresLabel}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Locked resources</h2>
          <ul className="mt-3 grid gap-3">
            {site.resources.map((r) => (
              <li key={r.commodity} className="rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
                <p className="text-sm font-medium text-fg">{r.commodity}</p>
                <p className="text-sm text-muted">{r.status}</p>
                {r.estimate ? <p className="mt-1 text-xs text-subtle">{r.estimate}</p> : null}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl text-fg">Missing overlay</h2>
          <p className="mt-1 font-mono text-xs text-accent">{site.missing.rateLabel}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.missing.notes}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Habitat</h2>
          <ul className="mt-3 grid gap-2">
            {site.habitat.map((h) => (
              <li key={h} className="text-sm text-muted">
                {h}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl text-fg">UAP / treaty lore</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.uapLore}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Jackson’s angle</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.jacksonAngle}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Legal observation</h2>
          <p className="mt-2 text-sm leading-relaxed text-warn">{site.publicObservation}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Sources</h2>
          <ul className="mt-3 grid gap-2">
            {site.sources.map((id) => {
              const src = sourceById(id);
              return (
                <li key={id} className="text-sm text-muted">
                  {src ? `${src.title} — ${src.who}` : id}
                </li>
              );
            })}
          </ul>
        </article>

        <aside className="grid h-fit gap-5">
          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Six-factor score</p>
            <p className="mt-1 font-display text-4xl tabular-nums text-accent">{score}</p>
            <div className="mt-4 grid gap-3">
              {SCORE_KEYS.map(({ key, label }) => (
                <ScoreBar key={key} label={label} value={site.scores[key]} />
              ))}
            </div>
          </div>
          {site.nearby.length ? (
            <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Nearby</p>
              <ul className="mt-2 grid gap-1 text-sm text-muted">
                {site.nearby.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      <NetworkMap selectedId={site.id} className="rounded-none" />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link to="/keepaway" className="text-sm text-accent">
          All keep-away ranges
        </Link>
        <div className="mt-6 flex flex-wrap gap-2">
          {SITES.filter((s) => s.id !== site.id)
            .slice(0, 6)
            .map((s) => (
              <Link
                key={s.id}
                to="/sites/$id"
                params={{ id: s.id }}
                className="rounded-full bg-surface px-3 py-2 text-xs text-muted hover:text-fg"
              >
                {s.shortName}
              </Link>
            ))}
        </div>
        <div className="mt-8">
          <Disclaimer compact />
        </div>
      </div>
    </main>
  );
}
