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
      <section className="relative border-b border-border">
        <NetworkMap className="min-h-[56vh] rounded-none" />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-[13px] text-muted">Research atlas</p>
        <h1 className="mt-4 max-w-3xl text-[2.5rem] text-fg md:text-[3.5rem]">
          An older civilization, still here, under the locked ground.
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
          A working map of Patrick Jackson’s Sphere Network on American keep-away land: ranges
          you cannot enter without an official reason, mineral inventories that sit unworked,
          missing-person rates that do not match the rest of the country. Vallée’s case against
          the star-visitor story is the floor.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            to="/keepaway"
            className="inline-flex h-9 items-center rounded-md bg-accent px-3.5 text-[13px] font-medium text-accent-fg"
          >
            The seven ranges
          </Link>
          <Link
            to="/locator"
            className="inline-flex h-9 items-center rounded-md px-3.5 text-[13px] text-fg shadow-[var(--shadow-border)]"
          >
            Rank habitats
          </Link>
          <Link
            to="/grid"
            className="inline-flex h-9 items-center rounded-md px-3.5 text-[13px] text-fg shadow-[var(--shadow-border)]"
          >
            Grid
          </Link>
          <Link
            to="/sands"
            className="inline-flex h-9 items-center rounded-md px-3.5 text-[13px] text-fg shadow-[var(--shadow-border)]"
          >
            Sands file
          </Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-20">
          <img
            src="/art/cavern.jpg"
            alt="Underground basalt cavern with cyan fiber-like veins of light"
            className="aspect-[16/10] w-full rounded-md object-cover"
          />
          <div>
            <p className="text-[13px] text-muted">Operators</p>
            <h2 className="mt-2 text-2xl text-fg">Jackson’s model</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Not visitors. A crustal species with large eyes because they live in the dark,
              running a planetary defense of silver spheres, able to step outside human
              flicker-fusion with a local time-dilation field.
            </p>
            <Link to="/theory" className="mt-5 inline-flex text-[13px] text-accent">
              Read the model
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-[13px] text-muted">Keep-away shortlist</p>
              <h2 className="mt-2 text-2xl text-fg">Seven candidates</h2>
            </div>
            <Link to="/locator" className="text-[13px] text-muted hover:text-fg">
              Rank by conditions
            </Link>
          </div>
          <p className="mt-3 max-w-xl text-[15px] text-muted">
            Closed access, unharvested resources, habitat. Ranked by a six-factor score — not by
            folklore volume.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-[13px] text-muted">Not a fence</p>
              <h2 className="mt-2 text-2xl text-fg">Corridor watch</h2>
            </div>
            <Link to="/connect" className="text-[13px] text-muted hover:text-fg">
              Why these were missing
            </Link>
          </div>
          <p className="mt-3 max-w-xl text-[15px] text-muted">
            Skinwalker as ground infrastructure. Catalina as the public half of a Navy door.
            Hudson Valley as the Type-1 billboard.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {WATCH_SITES.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {SPHERE_TYPES.map((t) => (
            <article key={t.type} className="px-5 py-10">
              <p className="font-mono text-[12px] text-subtle">Type {t.type}</p>
              <h3 className="mt-2 text-lg text-fg">{t.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{t.job}</p>
              <p className="mt-4 font-mono text-[12px] text-subtle">
                {t.size} · {t.altitude}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <Disclaimer />
        </div>
      </footer>
    </main>
  );
}
