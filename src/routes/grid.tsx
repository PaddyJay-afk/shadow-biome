import { createFileRoute, Link } from "@tanstack/react-router";
import { NetworkMap } from "@/components/network-map";
import { Disclaimer } from "@/components/disclaimer";
import { Badge } from "@/components/ui/badge";
import { ANCIENT, fmtDecl } from "@/data/ancient";
import { WMM_NOTE } from "@/data/isogonics";

export const Route = createFileRoute("/grid")({ component: GridPage });

const BARNHART = [
  { id: "chichen", claim: "Yucatán" },
  { id: "giza", claim: "Egypt" },
  { id: "harappa", claim: "Harappa" },
  { id: "angkor", claim: "SE Asia" },
] as const;

function GridPage() {
  return (
    <main>
      <section className="relative">
        <NetworkMap preset="grid" className="min-h-[52vh] rounded-none" />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Handshake corridor</p>
        <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">The zero line, the rifts, the grid</h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          On Shawn Ryan #335, Ed Barnhart almost swallowed the sentence.{" "}
          <em className="text-fg">
            “The cradles of civilization hover along the places in the world where magnetic interference is
            zero… a sine wave that goes through the Earth… it tags the cradles.”
          </em>{" "}
          He named Yucatán, Egypt, Harappa, Southeast Asia. Then he said it was crackpot, and that he could
          not prove it archaeologically. This page is the proof-test, not the sermon.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-subtle">{WMM_NOTE}</p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-3xl text-fg">Barnhart’s four vs the model</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            “Exactly zero” fails. “On the quiet sine wave” does not. Gold squares on the map are the
            megaliths. Toggle D° if you hid it.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                <tr>
                  <th className="pb-3 pr-4">He said</th>
                  <th className="pb-3 pr-4">Site</th>
                  <th className="pb-3 pr-4">D (WMM)</th>
                  <th className="pb-3">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {BARNHART.map((row) => {
                  const s = ANCIENT.find((a) => a.id === row.id)!;
                  const near = Math.abs(s.declination) < 2.5;
                  return (
                    <tr key={row.id} className="border-t border-border">
                      <td className="py-3 pr-4 text-muted">{row.claim}</td>
                      <td className="py-3 pr-4">
                        <Link to="/ancient/$id" params={{ id: s.id }} className="text-accent">
                          {s.shortName}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums text-fg">{fmtDecl(s.declination)}</td>
                      <td className="py-3 text-muted">
                        {near ? "On or within 2.5° of the agonic" : "Sister contour (~5°), not zero"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">
            The British henge belt — Stonehenge +0.3°, Avebury +0.3°, Carnac +0.2° — is a cleaner hit than
            Giza, and Barnhart did not name it. The U.S. keep-aways sit the other way: Groom +11°, China Lake
            +11°, UTTR +11°, Skinwalker +9.5°, ANWR +15°. Quiet band for cities. Noisy band for the locked
            ranges.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="font-display text-3xl text-fg">Three clocks, one occupancy</h2>
          <ol className="mt-6 grid gap-6">
            <li>
              <h3 className="font-display text-2xl text-fg">1. The moving agonic</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Declination is the angle between true north and magnetic north. The 0° contour — the agonic —
                is a sine wave that currently threads the Mississippi–Yucatán, then Africa–Arabia, then the
                Malay world. It wanders about a tenth of a degree a year. A city founded in 3000 BCE cannot
                have been sited on the 2025 Boy Scout map. So either Barnhart noticed a coincidence with the
                20–35°N agricultural belt, or the useful quantity is a <em>quiet band</em> (|D| ≲ 6°) that
                the pole keeps sweeping, or something in the core is steering the field back toward occupied
                nodes. Vallée’s thermostat, applied to the dynamo.
              </p>
            </li>
            <li>
              <h3 className="font-display text-2xl text-fg">2. The rifts are the better lock</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Toggle Faults. Göbekli sits on the East Anatolian. Baalbek and Jericho on the Dead Sea
                Transform. Giza and the Osirion on the Nile hinge. Teotihuacan on the Trans-Mexican volcanic
                belt. Sacsayhuamán on the Andean megathrust. Poverty Point and Cahokia on the Reelfoot / New
                Madrid failed rift. Derinkuyu is carved in volcanic tuff. Nan Madol is a basalt city already
                in the sea. Crustal fracture is the signal that survives when the compass line moves. Jackson
                wanted volume under a hinge. This is that map.
              </p>
            </li>
            <li>
              <h3 className="font-display text-2xl text-fg">3. Leys as folk memory of the same cables</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Alfred Watkins saw straight tracks in Britain. Becker and Hagens later draped a platonic
                solid on the globe and called the nodes a world grid. This atlas draws a 72° meridian/parallel
                lattice (the Hancock–Bauval geometric habit) plus named alignments that actually pass through
                the megaliths: St Michael, the Anatolian spine, the Mississippi mound line, the Andean
                spine, the Harappa–Angkor quiet belt. Treat the grid as a hypothesis overlay, not a surveyed
                utility. The named lines are the ones that still mean something when you put faults and D°
                on at the same time.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="font-display text-3xl text-fg">The handshake</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            A compass on the agonic points at the same star a sextant does. Magnetic heading equals celestial
            heading. That is the only place on Earth where a crustal navigator (magnetoreception — sharks,
            turtles, maybe us, maybe them) and a sky navigator share a bearing. Barnhart asked whether zero
            interference does something to the human mind. Graham Hancock asked who taught the sages to lock
            stone to the sky after the Younger Dryas flood. Jacques Vallée asked why the visitors look like
            our folklore. Patrick Jackson answered with operators under the network who freeze local time.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Put those in one sentence and you get a testable occupancy: <strong className="text-fg">seed
            cities on the quiet magnetic corridor</strong> (think, farm, ritual, handshake with the sky),{" "}
            <strong className="text-fg">workshops and keep-aways on the noisy fractured crust</strong> (power,
            hide, deny). Two faces of one species. The Andes fail the compass test and pass the fault test —
            workshops. Wiltshire passes the compass test and fails the fault test — handshake. Göbekli and
            Giza pass both. That is the new information. Click a gold square.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Hancock’s lost ice-age civilisation does not have to be us. The simpler read, once you already
            have ultraterrestrials in the basement, is that the “sages” were the basement. They came up after
            the flood, taught a restart on the quiet band, and went back down through the rifts. Cities
            remember them as gods. Ranges remember them as keep-away.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-3xl text-fg">Ancient pins</h2>
          <p className="mt-2 text-sm text-muted">Click through for stills and the TL;DR.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ANCIENT.map((s) => (
              <Link
                key={s.id}
                to="/ancient/$id"
                params={{ id: s.id }}
                className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-colors hover:bg-surface-2"
              >
                <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">{s.region}</p>
                <h3 className="mt-1 font-display text-2xl text-fg">{s.shortName}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge>{fmtDecl(s.declination)}</Badge>
                  <Badge tone="warn">{s.kind}</Badge>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-muted">{s.tldr}</p>
              </Link>
            ))}
          </div>
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
