/**
 * A reconstructed 48-beat Q-code pattern in the spirit of Jackson’s method:
 * binary lifted from a crop formation (Chilbolton 2001 is the public 23×73
 * Arecibo-reply grid) and driven into a lamp. This is not a dump of the
 * proprietary sequence from the book — it is a working model of the idea so
 * the strobe page can actually flash a code, not a random disco.
 *
 * 1 = lamp on, 0 = lamp off. Grouped in octets for the UI.
 */
export const QCODE_BITS: number[] = [
  1, 0, 1, 1, 0, 0, 1, 0,
  1, 1, 1, 0, 0, 1, 0, 1,
  0, 0, 1, 1, 0, 1, 1, 0,
  1, 0, 0, 1, 1, 1, 0, 0,
  0, 1, 0, 1, 1, 0, 1, 1,
  1, 0, 1, 0, 0, 1, 1, 0,
];

export const QCODE_NOTE =
  "Chilbolton 2001 reused the 23×73 Arecibo bitmap, swapped carbon for silicon, and replaced the human with a large-headed figure. Jackson’s claim is that Type-3 spheres lay these grids, and that an AI extract of the bitstream, clocked into a strobe, defeats optical stealth because the cloak is computed against human flicker-fusion — not against a hostile clock.";

export const STROBE_PHYSICS = [
  {
    title: "Flicker fusion",
    body: "Human vision binds pulses above roughly 50–90 Hz into steady light. Below that, we see flicker. A being that lives in a locally dilated time would occupy a different fusion band. Clocking a lamp to a foreign binary is a way of sampling outside our band.",
  },
  {
    title: "60 fps as a net",
    body: "Jackson filmed at 60 fps 4K and says the figure is in the frames, with light bending a moment before occupancy. Consumer 24/30 fps video is, on this model, a sieve they already know how to walk through.",
  },
  {
    title: "Active camouflage",
    body: "If the cloak is a real-time light-field reconstruction — paint the background onto the body — a strobe that is not in the reconstruction loop should tear the paint. Jackson: ‘the strobe just burns through optical stealth.’",
  },
  {
    title: "Local freeze",
    body: "The same field that lets them walk in freeze-frame is the reason a human standing next to the event remembers nothing, or a missing-person search crosses the ground they are standing on. Time is the fence.",
  },
];
