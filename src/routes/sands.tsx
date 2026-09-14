import { createFileRoute, Link } from "@tanstack/react-router";
import {
  COMPETING,
  EVIDENCE_STACK,
  JAY_HYPOTHESIS,
  JOINS,
  SANDS_BIO,
  SANDS_QUOTE,
  SANDS_THESIS,
  TWO_LAYERS,
  WATCH,
} from "@/data/sands";

export const Route = createFileRoute("/sands")({ component: SandsPage });

function SandsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        Witness file · memory as keep-away
      </p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">The man on the wire</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">{SANDS_THESIS}</p>
      <blockquote className="mt-6 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
        {SANDS_QUOTE.text}
        <footer className="mt-2 font-mono text-[11px] uppercase tracking-wider text-subtle">
          {SANDS_QUOTE.who}
        </footer>
      </blockquote>

      <h2 className="mt-14 font-display text-3xl text-fg">Who he says he is</h2>
      <dl className="mt-6 grid gap-5">
        {SANDS_BIO.map((row) => (
          <div key={row.k}>
            <dt className="font-medium text-fg">{row.k}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">{row.v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-14 font-display text-3xl text-fg">Two layers, different grades</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Do not average them. The intercept is a job story that AARO thinks it has named. The
        desert is a memory story that no office has a photograph of.
      </p>
      <div className="mt-6 grid gap-4">
        {TWO_LAYERS.map((l) => (
          <article key={l.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{l.grade}</p>
            <h3 className="mt-1 font-display text-2xl text-fg">{l.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{l.body}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">Jay’s stretch</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Posted 12 Sep 2026, under a Good Morning UFO / HeyOcean preview of a Sands deep-dive. Not
        a claim that the physics is in the journals. A claim about what a Legacy-adjacent shop
        would buy if it could.
      </p>
      <div className="mt-6 grid gap-4">
        {JAY_HYPOTHESIS.map((h) => (
          <article key={h.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-xl text-fg">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">What the open file actually holds</h2>
      <div className="mt-6 grid gap-4">
        {EVIDENCE_STACK.map((e) => (
          <article key={e.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">{e.grade}</p>
            <h3 className="mt-1 font-display text-xl text-fg">{e.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{e.body}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">Five readings</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Ranked by how much new machinery they need, not by which one is comforting.
      </p>
      <ol className="mt-6 grid gap-4">
        {COMPETING.map((c, i) => (
          <li key={c.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-2xl text-fg">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-3xl text-fg">Joins to this atlas</h2>
      <div className="mt-6 grid gap-4">
        {JOINS.map((j) => (
          <article key={j.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-xl text-fg">{j.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{j.body}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-fg">Watch list</h2>
      <ul className="mt-6 grid gap-3">
        {WATCH.map((w) => (
          <li key={w} className="rounded-lg bg-surface px-4 py-3 text-sm leading-relaxed text-muted shadow-[var(--shadow-border)]">
            {w}
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm leading-relaxed text-subtle">
        This page does not offer a method. It grades a hypothesis. Public papers on the microwave
        auditory effect describe clicks and buzzes, not a writable inner cinema. If a classified
        layer can do more than that, it is not in the library this atlas can cite.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/theory"
          className="inline-flex h-12 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
        >
          Lineage
        </Link>
        <Link
          to="/vallee"
          className="inline-flex h-12 items-center rounded-md px-5 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
        >
          Vallée
        </Link>
        <Link
          to="/keepaway"
          className="inline-flex h-12 items-center rounded-md px-5 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
        >
          Ranges
        </Link>
      </div>
    </main>
  );
}
