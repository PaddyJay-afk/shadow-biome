import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SITES } from "@/data/sites";
import { addReport, listReports, removeReport, type FieldReport } from "@/lib/reports";

export const Route = createFileRoute("/field")({ component: FieldPage });

function FieldPage() {
  const [tick, setTick] = useState(0);
  const reports = useMemo(() => listReports(), [tick]);
  const [kind, setKind] = useState<FieldReport["kind"]>("sphere");
  const [siteId, setSiteId] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  function pickSite(id: string) {
    setSiteId(id);
    const site = SITES.find((s) => s.id === id);
    if (site && !place.trim()) setPlace(site.shortName);
  }

  function onFile(file: File | undefined) {
    if (!file) {
      setPhoto(undefined);
      return;
    }
    if (file.size > 1_200_000) {
      setError("Keep stills under about 1 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!place.trim() || !notes.trim()) {
      setError("Place and notes are required.");
      return;
    }
    const site = SITES.find((s) => s.id === siteId);
    addReport({
      place: place.trim(),
      siteId: site?.id,
      lat: site?.lat,
      lng: site?.lng,
      date: date || new Date().toISOString().slice(0, 10),
      kind,
      notes: notes.trim(),
      photoDataUrl: photo,
    });
    setPlace("");
    setNotes("");
    setPhoto(undefined);
    setTick((n) => n + 1);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Local archive</p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">Field notes</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Stored only in this browser. No names, no home addresses, no coordinates of a house. Pin the
        note to an atlas site and it plots as a cyan diamond on the world map. Public land only.
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <label className="grid gap-1 text-sm">
          <span className="text-muted">Atlas pin (optional — plots on the map)</span>
          <select
            value={siteId}
            onChange={(e) => pickSite(e.target.value)}
            className="h-11 rounded-md bg-bg px-3 text-fg shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring/70"
          >
            <option value="">Not tied to a dossier</option>
            {SITES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shortName} — {s.region}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-muted">Place (public land, range-adjacent town, park)</span>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="h-11 rounded-md bg-bg px-3 text-fg shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring/70"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="text-muted">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 rounded-md bg-bg px-3 text-fg shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring/70"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted">Kind</span>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as FieldReport["kind"])}
              className="h-11 rounded-md bg-bg px-3 text-fg shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring/70"
            >
              <option value="sphere">Sphere / triangle</option>
              <option value="figure">Figure / strobe frame</option>
              <option value="missing">Missing overlay</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <label className="grid gap-1 text-sm">
          <span className="text-muted">Notes</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            className="rounded-md bg-bg px-3 py-2 text-fg shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring/70"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-muted">Still (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0])}
            className="text-sm text-muted file:mr-3 file:h-11 file:rounded-md file:border-0 file:bg-surface-2 file:px-3 file:text-fg"
          />
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit">Save in this browser</Button>
      </form>

      <h2 className="mt-12 font-display text-3xl text-fg">Archive</h2>
      {reports.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Nothing stored yet.</p>
      ) : (
        <ul className="mt-4 grid gap-4">
          {reports.map((r) => (
            <li key={r.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                    {r.kind} · {r.date}
                    {r.lat != null ? " · on map" : ""}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-fg">{r.place}</h3>
                  {r.siteId ? (
                    <Link
                      to="/sites/$id"
                      params={{ id: r.siteId }}
                      className="mt-1 inline-flex text-sm text-accent"
                    >
                      Open dossier
                    </Link>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="text-sm text-muted hover:text-danger"
                  onClick={() => {
                    removeReport(r.id);
                    setTick((n) => n + 1);
                  }}
                >
                  Remove
                </button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">{r.notes}</p>
              {r.photoDataUrl ? (
                <img
                  src={r.photoDataUrl}
                  alt=""
                  className="mt-4 max-h-64 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-fg/10"
                />
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
