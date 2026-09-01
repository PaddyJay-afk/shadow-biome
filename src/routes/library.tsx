import { createFileRoute } from "@tanstack/react-router";
import { SOURCES } from "@/data/sources";

export const Route = createFileRoute("/library")({ component: LibraryPage });

function LibraryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Citations</p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">Sources</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Jackson’s book is the spine. Keel, Tonnies, Puthoff, Nolan, and Vallée are the intellectual
        neighborhood. Park Service cold cases, NamUs/Newsweek rates, the NTTR withdrawal, EPA’s
        Pebble veto, and the wilderness mineral inventory are the civil-service layer. Dulce remains
        labeled as literature.
      </p>
      <ul className="mt-10 grid gap-4">
        {SOURCES.map((s) => (
          <li key={s.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
              {s.kind} · {s.year}
            </p>
            <h2 className="mt-1 font-display text-2xl text-fg">{s.title}</h2>
            <p className="text-sm text-accent">{s.who}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.note}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
