import { createFileRoute, Link } from "@tanstack/react-router";
import { ACCOUNTS, X_PAPERS } from "@/data/accounts";
import { CONNECTIONS } from "@/data/connections";
import { siteById } from "@/data/sites";

export const Route = createFileRoute("/connect")({ component: ConnectPage });

function ConnectPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">X + missed links</p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">Look at the whole corridor, then the ranch.</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        X is where the occupancy claim is argued in public. The atlas was missing the nodes that
        are not fences: Skinwalker as a named ground node, Yakima as the dry hinge, Catalina as the
        public half of a Navy door, Hudson Valley as the Type-1 billboard, Aztec as Dulce’s 1950
        caption. Polar vents and Google-Earth seamounts stay off the map.
      </p>

      <img
        src="/art/corridor.jpg"
        alt="Night schematic of the American West occupancy corridor with cyan fibers and three silver spheres"
        className="mt-8 aspect-video w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-fg/10"
      />

      <h2 className="mt-14 font-display text-3xl text-fg">Accounts worth reading</h2>
      <ol className="mt-6 grid gap-4">
        {ACCOUNTS.map((a) => (
          <li key={a.handle} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
              {a.grade} · {a.followers}
            </p>
            <h3 className="mt-1 font-display text-2xl text-fg">{a.name}</h3>
            <p className="text-sm text-accent">@{a.handle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.why}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-3xl text-fg">Papers the threads actually pass around</h2>
      <ul className="mt-6 grid gap-4">
        {X_PAPERS.map((p) => (
          <li key={p.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
              {p.year} · {p.who}
            </p>
            <h3 className="mt-1 font-display text-xl text-fg">{p.title}</h3>
            <p className="mt-1 text-xs text-subtle">{p.pointer}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.note}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-3xl text-fg">Missed connections</h2>
      <div className="mt-6 grid gap-4">
        {CONNECTIONS.map((c) => (
          <article key={c.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{c.scale}</p>
            <h3 className="mt-1 font-display text-2xl text-fg">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            <p className="mt-3 flex flex-wrap gap-2">
              {c.sites.map((id) => {
                const site = siteById(id);
                if (!site) return null;
                return (
                  <Link
                    key={id}
                    to="/sites/$id"
                    params={{ id }}
                    className="rounded-md bg-bg px-2 py-1 font-mono text-[11px] text-fg"
                  >
                    {site.shortName}
                  </Link>
                );
              })}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
