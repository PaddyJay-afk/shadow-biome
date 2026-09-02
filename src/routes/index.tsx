import { createFileRoute, Link } from "@tanstack/react-router";
import { NetworkMap } from "@/components/network-map";
import { SiteCard } from "@/components/site-card";
import { Disclaimer } from "@/components/disclaimer";
import { PRIMARY_SITES, WATCH_SITES, overallScore } from "@/data/sites";
import { SPHERE_TYPES } from "@/data/theory";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const ranked = [...PRIMARY_SITES].sort(
    (a, b) => overallScore(b.scores) - overallScore(a.scores),
  );

  return (
    <main>
      <section className="relative">
        <NetworkMap className="min-h-[52vh] rounded-none" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Ultraterrestrial atlas</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.08] text-fg md:text-6xl">
          An older civilization, still here, under the locked ground.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Shadow Biome is a working map of Patrick Jackson’s Sphere Network laid onto American
          keep-away land: ranges you cannot enter without an official reason, mineral and oil
          inventories that sit unworked, and missing-person rates that do not look like the rest of
          the country. Jacques Vallée’s case against the star-visitor story is the floor: too many
          landings, too-humanoid bodies, a history older than 1947. Toggle Type 1–3 fibers and the
          amber missing overlay. Pin a field note to a site and it plots as a diamond.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/keepaway"
            className="inline-flex h-12 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
          >
            The seven ranges
          </Link>
          <Link
            to="/locator"
            className="inline-flex h-12 items-center rounded-md px-5 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
          >
            Rank habitats
          </Link>
          <Link
            to="/grid"
            className="inline-flex h-12 items-center rounded-md px-5 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
          >
            Zero line / faults / leys
          </Link>
          <Link
            to="/connect"
            className="inline-flex h-12 items-center rounded-md px-5 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
          >
            X + missed links
          </Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 md:items-center">
          <img
            src="/art/cavern.jpg"
            alt="Underground basalt cavern with cyan fiber-like veins of light"
            className="aspect-video w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
          <div>
            <h2 className="font-display text-3xl text-fg">Jackson’s operators</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              Not visitors. A crustal species with large eyes because they live in the dark, running
              a planetary defense of silver spheres, able to step outside human flicker-fusion with
              a local time-dilation field. The Q-code strobe — binary pulled from a crop formation —
              is the only public method he has demonstrated that tears the cloak.
            </p>
            <Link to="/theory" className="mt-4 inline-flex h-11 items-center text-sm text-accent">
              Read the model
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-fg">Primary keep-away shortlist</h2>
          <Link to="/locator" className="text-sm text-accent">
            Rank by conditions
          </Link>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Seven U.S. (and Alaska) candidates that jointly match closed access, unharvested
          resources, and the ultraterrestrial habitat model. Ranked by a six-factor score — not by
          folklore volume alone.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-fg">Corridor watch</h2>
            <Link to="/connect" className="text-sm text-accent">
              Why these were missing
            </Link>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Nodes that are not fences: Skinwalker as ground infrastructure, Catalina as the public
            half of a Navy door, Hudson Valley as the Type-1 billboard. Fail a keep-away test;
            stay on the map.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WATCH_SITES.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
          {SPHERE_TYPES.map((t) => (
            <article key={t.type} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">Type {t.type}</p>
              <h3 className="mt-2 font-display text-2xl text-fg">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.job}</p>
              <p className="mt-3 font-mono text-xs text-subtle">
                {t.size} · {t.altitude}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Disclaimer />
        </div>
      </footer>
    </main>
  );
}
