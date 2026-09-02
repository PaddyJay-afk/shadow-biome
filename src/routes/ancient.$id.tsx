import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Disclaimer } from "@/components/disclaimer";
import { Badge } from "@/components/ui/badge";
import { NetworkMap } from "@/components/network-map";
import { ANCIENT, ancientById, fmtDecl } from "@/data/ancient";

export const Route = createFileRoute("/ancient/$id")({
  loader: ({ params }) => {
    const site = ancientById(params.id);
    if (!site) throw notFound();
    return { site };
  },
  component: AncientPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl text-fg">No such pin</h1>
      <Link to="/grid" className="mt-4 inline-flex h-11 items-center text-sm text-accent">
        Back to the grid
      </Link>
    </main>
  ),
});

function AncientPage() {
  const { site } = Route.useLoaderData();
  const others = ANCIENT.filter((s) => s.id !== site.id).slice(0, 4);

  return (
    <main>
      <div className="relative">
        <img src={site.images[0]?.src} alt="" className="h-56 w-full object-cover md:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{site.region}</p>
          <h1 className="mt-2 font-display text-4xl text-fg md:text-5xl">{site.name}</h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article>
          <div className="flex flex-wrap gap-2">
            <Badge tone="warn">{site.kind}</Badge>
            <Badge>{fmtDecl(site.declination)}</Badge>
            <Badge tone="muted">{site.era}</Badge>
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted">{site.tldr}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Stills</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {site.images.map((img) => (
              <figure key={img.src}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-fg/10"
                />
                <figcaption className="mt-2 text-xs text-subtle">{img.alt}</figcaption>
              </figure>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl text-fg">Analysis</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.analysis}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Fault / crust</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.fault}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">NHI read</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.nhi}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Hancock vs the trench</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <span className="text-fg">Hancock. </span>
            {site.hancock}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <span className="text-fg">Mainstream. </span>
            {site.mainstream}
          </p>
        </article>

        <aside className="h-fit">
          <NetworkMap selectedId={site.id} preset="grid" className="aspect-square" />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-subtle">
            {site.lat.toFixed(2)}°, {site.lng.toFixed(2)}°
          </p>
          <h2 className="mt-8 font-display text-xl text-fg">Other pins</h2>
          <ul className="mt-3 grid gap-2">
            {others.map((o) => (
              <li key={o.id}>
                <Link to="/ancient/$id" params={{ id: o.id }} className="text-sm text-accent">
                  {o.shortName}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/grid" className="mt-6 inline-flex h-11 items-center text-sm text-accent">
            Full grid essay
          </Link>
        </aside>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Disclaimer />
        </div>
      </footer>
    </main>
  );
}
