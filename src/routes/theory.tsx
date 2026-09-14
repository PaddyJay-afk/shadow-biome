import { createFileRoute, Link } from "@tanstack/react-router";
import { CONDITIONS, JACKSON_OPERATORS, LINEAGE, SPHERE_TYPES } from "@/data/theory";
import { EYE_ARGUMENT, FOLK_UNDERWORLDS, SCHOOLS } from "@/data/schools";

export const Route = createFileRoute("/theory")({ component: TheoryPage });

function TheoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Lineage</p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">They are from here.</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Ultraterrestrial, as this atlas uses it, is not a synonym for ghost and not a synonym for
        astronaut. It is the claim that an older, more capable occupancy shares the planet —
        underground, under ice, under the shelves — and that the silver spheres are their
        infrastructure, not their spaceships.
      </p>

      <img
        src="/art/sphere.jpg"
        alt="Metallic silver sphere rim-lit against a night sky"
        className="mt-8 aspect-video w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-fg/10"
      />

      <ol className="mt-10 grid gap-6">
        {LINEAGE.map((item) => (
          <li key={item.name} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
              {item.year} · {item.work}
            </p>
            <h2 className="mt-1 font-display text-2xl text-fg">{item.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.point}</p>
            {item.name === "Jacques Vallée" ? (
              <Link to="/vallee" className="mt-3 inline-flex h-10 items-center text-sm text-accent">
                Vallée in full
              </Link>
            ) : null}
          </li>
        ))}
      </ol>

      <article className="mt-10 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <p className="font-mono text-[11px] uppercase tracking-wider text-accent">Working file</p>
        <h2 className="mt-1 font-display text-2xl text-fg">Jason Sands — memory as keep-away</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          The red-team intercept is the job. The Quartz Mountain being may be a sincere memory that
          is not a veridical event. Jay’s stretch: a field around the people who hear the wrong
          sentence.
        </p>
        <Link to="/sands" className="mt-3 inline-flex h-10 items-center text-sm text-accent">
          Sands dossier
        </Link>
      </article>

      <h2 className="mt-14 font-display text-3xl text-fg">Schools of occupancy</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Core models treat the occupants as indigenous or sequestered on Earth. Adjacent models keep
        humans in the tunnels. Lore is labeled. Hollow-Earth tourism is rejected.
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border font-mono text-[11px] uppercase tracking-wider text-subtle">
            <tr>
              <th className="px-4 py-3 font-medium">School</th>
              <th className="px-4 py-3 font-medium">Habitat</th>
              <th className="px-4 py-3 font-medium">Intent</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {SCHOOLS.map((s) => (
              <tr key={s.id} className="border-b border-border/70 align-top last:border-0">
                <td className="px-4 py-3 font-medium text-fg">{s.name}</td>
                <td className="px-4 py-3 text-muted">{s.habitat}</td>
                <td className="px-4 py-3 text-muted">{s.intent}</td>
                <td className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-subtle">
                  {s.stance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">Older underworlds</h2>
      <div className="mt-6 grid gap-4">
        {FOLK_UNDERWORLDS.map((f) => (
          <article key={f.name} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-xl text-fg">{f.name}</h3>
            <p className="font-mono text-xs text-subtle">{f.where}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.note}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">{EYE_ARGUMENT.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{EYE_ARGUMENT.body}</p>

      <h2 className="mt-14 font-display text-3xl text-fg">The Sphere Network</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Patrick Jackson, IT specialist turned citizen scientist, argues the orbs are a three-layer
        automated defense that has been running for a very long time. Type 3 orbs are the ones you
        can almost photograph with a phone. Type 1 you can see with the naked eye if you know to
        look for three equal lights.
      </p>
      <div className="mt-6 grid gap-4">
        {SPHERE_TYPES.map((t) => (
          <article key={t.type} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] text-accent">Type {t.type} · {t.size}</p>
            <h3 className="mt-1 font-display text-2xl text-fg">{t.title}</h3>
            <p className="mt-2 text-sm text-muted">{t.job}</p>
            <p className="mt-2 text-xs text-subtle">{t.altitude}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">The operators</h2>
      <dl className="mt-6 grid gap-5">
        <div>
          <dt className="font-medium text-fg">Habitat</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{JACKSON_OPERATORS.habitat}</dd>
        </div>
        <div>
          <dt className="font-medium text-fg">Local freeze</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{JACKSON_OPERATORS.time}</dd>
        </div>
        <div>
          <dt className="font-medium text-fg">Cloak</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{JACKSON_OPERATORS.cloak}</dd>
        </div>
        <div>
          <dt className="font-medium text-fg">Energy</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{JACKSON_OPERATORS.energy}</dd>
        </div>
        <div>
          <dt className="font-medium text-fg">Scarecrow</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{JACKSON_OPERATORS.scarecrow}</dd>
        </div>
        <div>
          <dt className="font-medium text-fg">Crop as codebook</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{JACKSON_OPERATORS.crop}</dd>
        </div>
      </dl>

      <img
        src="/art/strobe-plate.jpg"
        alt="Scientific plate of a large-eyed insectoid figure freeze-framed by a cyan strobe"
        className="mt-10 aspect-[4/3] w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-fg/10"
      />
      <p className="mt-2 text-xs text-subtle">
        Reconstruction of Jackson’s 2015 tunnel observation: elongated cranium, oversized dark eyes,
        light bending before occupancy. Not a photograph from the book.
      </p>

      <h2 className="mt-14 font-display text-3xl text-fg">Locator conditions</h2>
      <div className="mt-6 grid gap-4">
        {CONDITIONS.map((c) => (
          <article key={c.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-xl text-fg">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
          </article>
        ))}
      </div>

      <Link
        to="/locator"
        className="mt-10 inline-flex h-12 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
      >
        Run the locator
      </Link>
    </main>
  );
}
