import { createFileRoute, Link } from "@tanstack/react-router";
import { NetworkMap } from "@/components/network-map";
import { ALASKA_MISSING_RATE, CLUSTERS, PAULIDES_MARKERS, STATE_RATES, US_MISSING_RATE } from "@/data/missing";

export const Route = createFileRoute("/missing")({ component: MissingPage });

function MissingPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Locator layer</p>
        <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">Missing, above background</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          If Type-3 spheres function as scarecrows — move the human, protect the node — then
          missing-person clusters are not a side mystery. They are a map. This page treats published
          rates and Paulides-style clusters as a signal to overlay on keep-away land, not as a
          completed theory of crime.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-wider text-subtle">Alaska</p>
            <p className="mt-2 font-display text-4xl tabular-nums text-accent">{ALASKA_MISSING_RATE}</p>
            <p className="mt-1 text-sm text-muted">per 100,000 residents (Newsweek / NamUs 2026)</p>
          </article>
          <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-wider text-subtle">Atlas background</p>
            <p className="mt-2 font-display text-4xl tabular-nums text-fg">~{US_MISSING_RATE}</p>
            <p className="mt-1 text-sm text-muted">approximate Lower-48 working baseline used here</p>
          </article>
          <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-wider text-subtle">Ratio</p>
            <p className="mt-2 font-display text-4xl tabular-nums text-fg">
              {(ALASKA_MISSING_RATE / US_MISSING_RATE).toFixed(1)}×
            </p>
            <p className="mt-1 text-sm text-muted">Alaska versus that baseline</p>
          </article>
        </div>
      </section>

      <NetworkMap className="rounded-none" />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-fg">State rates</h2>
        <div className="mt-6 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-border font-mono text-[11px] uppercase tracking-wider text-subtle">
              <tr>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 font-medium">Per 100k</th>
                <th className="px-4 py-3 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {STATE_RATES.map((row) => (
                <tr key={row.state} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-3 text-fg">{row.state}</td>
                  <td className="px-4 py-3 font-mono tabular-nums text-accent">{row.rate.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-14 font-display text-3xl text-fg">Clusters</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CLUSTERS.map((c) => (
            <article key={c.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <h3 className="font-display text-2xl text-fg">{c.name}</h3>
              <p className="mt-1 font-mono text-xs text-subtle">{c.cases}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.notes}</p>
              {c.relatedSiteId ? (
                <Link
                  to="/sites/$id"
                  params={{ id: c.relatedSiteId }}
                  className="mt-3 inline-flex h-10 items-center text-sm text-accent"
                >
                  Related keep-away
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl text-fg">Paulides markers</h2>
        <ul className="mt-4 grid gap-2 text-sm text-muted">
          {PAULIDES_MARKERS.map((m) => (
            <li key={m} className="rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
              {m}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
