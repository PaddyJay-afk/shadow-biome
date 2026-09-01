import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { QCODE_BITS, QCODE_NOTE, STROBE_PHYSICS } from "@/data/qcode";

export const Route = createFileRoute("/strobe")({ component: StrobePage });

function StrobePage() {
  const [armed, setArmed] = useState(false);
  const [running, setRunning] = useState(false);
  const [hz, setHz] = useState(8);
  const [lit, setLit] = useState(false);
  const [cursor, setCursor] = useState(0);
  const bitRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const interval = 1000 / Math.max(2, Math.min(12, hz));
    const id = window.setInterval(() => {
      const on = QCODE_BITS[bitRef.current] === 1;
      setLit(on);
      bitRef.current = (bitRef.current + 1) % QCODE_BITS.length;
      setCursor(bitRef.current);
    }, interval);
    return () => window.clearInterval(id);
  }, [running, hz]);

  useEffect(() => {
    const stop = () => setRunning(false);
    document.addEventListener("visibilitychange", stop);
    return () => document.removeEventListener("visibilitychange", stop);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Optical stealth</p>
      <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">The Q-code strobe</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Jackson extracted a binary sequence from a crop formation with AI, built a lamp that clocks
        that sequence, and filmed at 60 fps. He reports that the strobe burns through active
        camouflage: light bends, then a large-eyed, non-human figure occupies a few frames. This
        page is a working model of the method — not a dump of the proprietary bitstream from the
        book, and not a promise that a browser lamp will do what his hardware did.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{QCODE_NOTE}</p>

      {!armed ? (
        <div className="mt-8 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl text-fg">Photosensitive warning</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The lamp flashes. Do not run it if you have epilepsy, migraine, or are sensitive to
            flicker. Cap is 12 Hz. It pauses if you leave the tab. This is a research illustration,
            not a field device.
          </p>
          <Button className="mt-4" onClick={() => setArmed(true)}>
            I understand — arm the lamp
          </Button>
        </div>
      ) : (
        <div className="mt-8">
          <div
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl outline outline-1 -outline-offset-1 outline-fg/10"
            style={{ background: lit && running ? "#9ff4ff" : "#07090c" }}
            aria-live="polite"
          >
            <img
              src="/art/strobe-plate.jpg"
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{ opacity: lit && running ? 0.2 : 0.55 }}
            />
            <p
              className="relative font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: lit && running ? "#051014" : "#8b9aab" }}
            >
              {running ? (lit ? "mark" : "space") : "idle"}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={() => setRunning((v) => !v)}>{running ? "Stop" : "Run Q-code"}</Button>
            <label className="flex items-center gap-3 text-sm text-muted">
              Clock
              <input
                type="range"
                min={4}
                max={12}
                value={hz}
                onChange={(e) => setHz(Number(e.target.value))}
                className="accent-accent"
              />
              <span className="font-mono tabular-nums text-fg">{hz} Hz</span>
            </label>
          </div>

          <div className="mt-4 grid grid-cols-8 gap-1">
            {QCODE_BITS.map((bit, i) => (
              <span
                key={i}
                className="h-6 rounded-sm"
                style={{
                  background:
                    i === (cursor + QCODE_BITS.length - 1) % QCODE_BITS.length && running
                      ? "#e7eef4"
                      : bit
                        ? "#7ee0f2"
                        : "#171e27",
                }}
              />
            ))}
          </div>
          <p className="mt-2 font-mono text-[11px] text-subtle">48-beat reconstructed packet · 1 = mark · 0 = space</p>
        </div>
      )}

      <div className="mt-12 grid gap-4">
        {STROBE_PHYSICS.map((item) => (
          <article key={item.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-xl text-fg">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        Field method, if you insist on trying this as research and not as trespass: public land,
        60 fps or higher, the lamp off-camera, and no expectation of a monster. Jackson’s result is
        a handful of frames. Most nights you will get moths.
      </p>
      <Link to="/field" className="mt-4 inline-flex h-11 items-center text-sm text-accent">
        Log a field note
      </Link>
    </main>
  );
}
