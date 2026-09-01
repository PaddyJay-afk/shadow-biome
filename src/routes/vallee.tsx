import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CONTROL_SYSTEM,
  ETH_ARGUMENTS,
  MAGONIA_UNDERGROUND,
  VALLEE_BOOKS,
  VALLEE_LEVELS,
  VALLEE_QUOTE,
  VALLEE_THESIS,
  VALLEE_VS_JACKSON,
} from "@/data/vallee";

export const Route = createFileRoute("/vallee")({ component: ValleePage });

function ValleePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Jacques Vallée</p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">A parallel country, already here.</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">{VALLEE_THESIS}</p>
      <blockquote className="mt-6 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
        {VALLEE_QUOTE}
        <footer className="mt-2 font-mono text-[11px] uppercase tracking-wider text-subtle">
          Vallée, on the control system
        </footer>
      </blockquote>

      <img
        src="/art/cavern.jpg"
        alt="Dark cavern with cyan veins of light — the hollow-hill image in a modern dialect"
        className="mt-8 aspect-video w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-fg/10"
      />
      <p className="mt-2 text-xs text-subtle">
        Folklore put them in the hill. Vallée’s claim is that the hill never stopped being the right
        map — only the caption changed from ‘Magonia’ to ‘spacecraft.’
      </p>

      <h2 className="mt-14 font-display text-3xl text-fg">Five arguments against ETH</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Journal of Scientific Exploration, 1990. These are negative claims: they do not locate a
        species under Archuleta Mesa. They clear the star-map so a terrestrial-adjacent occupancy
        can even be thought.
      </p>
      <ol className="mt-6 grid gap-4">
        {ETH_ARGUMENTS.map((a) => (
          <li key={a.n} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
              {String(a.n).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-2xl text-fg">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-3xl text-fg">The control system</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{CONTROL_SYSTEM.body}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{CONTROL_SYSTEM.thermostat}</p>
      <ul className="mt-4 grid gap-2">
        {CONTROL_SYSTEM.notThis.map((n) => (
          <li key={n} className="rounded-lg bg-surface px-4 py-3 text-sm text-muted shadow-[var(--shadow-border)]">
            {n}
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-3xl text-fg">Three levels at once</h2>
      <div className="mt-6 grid gap-4">
        {VALLEE_LEVELS.map((l) => (
          <article key={l.level} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-xl text-fg">{l.level}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{l.body}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">Magonia under the ground</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        This is the join between Vallée and the keep-away atlas. He never publishes a list of seven
        American treaty boxes. He does say the others, in the old file, lived in hills and came out.
        Restricted ranges, locked minerals, and polar night are this atlas’s attempt to put geology
        under that sentence.
      </p>
      <div className="mt-6 grid gap-4">
        {MAGONIA_UNDERGROUND.map((m) => (
          <article key={m.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-xl text-fg">{m.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">The books</h2>
      <ol className="mt-6 grid gap-4">
        {VALLEE_BOOKS.map((b) => (
          <li key={b.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">{b.year}</p>
            <h3 className="mt-1 font-display text-2xl text-fg">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{b.thesis}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-3xl text-fg">Vallée beside Jackson</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The Sphere Network is a positive model. Vallée is a demolition of ETH plus a control-system
        sketch. This atlas uses both: Vallée to forbid the easy space-visitor story, Jackson to say
        who might be running the lights.
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border font-mono text-[11px] uppercase tracking-wider text-subtle">
            <tr>
              <th className="px-4 py-3 font-medium">Axis</th>
              <th className="px-4 py-3 font-medium">Vallée</th>
              <th className="px-4 py-3 font-medium">Jackson</th>
            </tr>
          </thead>
          <tbody>
            {VALLEE_VS_JACKSON.map((row) => (
              <tr key={row.axis} className="border-b border-border/70 align-top last:border-0">
                <td className="px-4 py-3 font-medium text-fg">{row.axis}</td>
                <td className="px-4 py-3 text-muted">{row.vallee}</td>
                <td className="px-4 py-3 text-muted">{row.jackson}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/theory"
          className="inline-flex h-12 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
        >
          Full lineage
        </Link>
        <Link
          to="/keepaway"
          className="inline-flex h-12 items-center rounded-md px-5 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
        >
          Keep-away ranges
        </Link>
      </div>
    </main>
  );
}
