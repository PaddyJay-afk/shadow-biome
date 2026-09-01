import { createFileRoute, Link } from "@tanstack/react-router";
import { Disclaimer } from "@/components/disclaimer";
import { SiteCard } from "@/components/site-card";
import { ACCESS_LABEL, PRIMARY_SITES, WATCH_SITES, overallScore } from "@/data/sites";

export const Route = createFileRoute("/keepaway")({ component: KeepawayPage });

function KeepawayPage() {
  const ranked = [...PRIMARY_SITES].sort(
    (a, b) => overallScore(b.scores) - overallScore(a.scores),
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">United States + Alaska</p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">The seven keep-away ranges</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        The claim in the UAP literature is that five to seven American boxes were set aside —
        Eisenhower-era treaty lore, Greada, Dulce — so that an older occupancy could keep a door.
        This atlas does not certify a treaty. It asks a narrower question: where, in the continental
        U.S. and Alaska, is valuable ground closed, unmined, and dark enough to be a habitat, with
        a missing-persons or UAP overlay?
      </p>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Filter used: official reason required to enter (or statutory lock against extraction),
        assessed oil/minerals/geothermal not taken, subsurface or maritime volume, and a
        strangeness or missing-person signal. Watchlist sites fail at least one of those tests and
        remain on the map anyway.
      </p>

      <div className="mt-10 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border font-mono text-[11px] uppercase tracking-wider text-subtle">
            <tr>
              <th className="px-4 py-3 font-medium">Site</th>
              <th className="px-4 py-3 font-medium">Access</th>
              <th className="px-4 py-3 font-medium">Lock</th>
              <th className="px-4 py-3 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s) => (
              <tr key={s.id} className="border-b border-border/70 last:border-0">
                <td className="px-4 py-3">
                  <Link to="/sites/$id" params={{ id: s.id }} className="text-fg hover:text-accent">
                    {s.shortName}
                  </Link>
                  <p className="text-xs text-subtle">{s.acresLabel}</p>
                </td>
                <td className="px-4 py-3 text-muted">{ACCESS_LABEL[s.access]}</td>
                <td className="px-4 py-3 text-muted">{s.resources[0]?.commodity}</td>
                <td className="px-4 py-3 font-mono tabular-nums text-accent">{overallScore(s.scores)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {ranked.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>

      <h2 className="mt-16 font-display text-3xl text-fg">Watchlist</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Resource locks without a rifle (Pebble, Glacier Peak, Glacier Bay), the Navy door split
        (San Clemente rifle, Catalina water), Jackson’s Skinwalker node, Yakima as the dry hinge,
        Hudson Valley as the Type-1 billboard, and Yosemite as a missing-persons control.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WATCH_SITES.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>

      <div className="mt-12">
        <Disclaimer />
      </div>
    </main>
  );
}
