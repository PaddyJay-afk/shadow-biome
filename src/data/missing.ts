import type { MissingCluster } from "./types";

export const US_MISSING_RATE = 12;
export const ALASKA_MISSING_RATE = 178.08;

export const STATE_RATES: { state: string; rate: number; note: string }[] = [
  { state: "Alaska", rate: 178.08, note: "Highest in the U.S. by a wide margin. Bush, Native village, and park cases." },
  { state: "Hawaii", rate: 20.13, note: "Second. Ocean, cliffs, and visitor vanishments." },
  { state: "Oklahoma", rate: 16.39, note: "Third. Not a wilderness story — still elevated." },
  { state: "Arizona", rate: 15.41, note: "Desert parks, reservation lands, migrant corridor." },
  { state: "Tennessee", rate: 14.4, note: "Great Smoky adjacency." },
];

export const CLUSTERS: MissingCluster[] = [
  {
    id: "yosemite",
    name: "Yosemite cluster",
    lat: 37.8651,
    lng: -119.5383,
    cases: "10 NPS unsolved missing cold cases — highest in the National Park System",
    notes:
      "Paulides’ primary Sierra cluster. Athletic hikers, boulder fields, sudden vanishings, bodies (when found) in previously searched ground. Control site: humans are allowed, and they still disappear.",
    relatedSiteId: "yosemite",
  },
  {
    id: "smokies",
    name: "Great Smoky Mountains cluster",
    lat: 35.6118,
    lng: -83.4895,
    cases: "4 NPS unsolved missing on the 25-case national cold list, plus historic cases (Dennis Martin 1969)",
    notes:
      "Eastern counterpart to Yosemite. Dense forest, sudden separation on trail, remains sometimes never recovered.",
  },
  {
    id: "crater-lake",
    name: "Crater Lake",
    lat: 42.9446,
    lng: -122.109,
    cases: "Samuel Boehlke (2006, age 8) remains the emblematic unsolved; Oregon parks carry 44 cases in one independent database",
    notes:
      "A water-filled caldera — Jackson’s subsurface niche with a public rim. Children vanishing at overlooks is a Paulides signature.",
  },
  {
    id: "uinta",
    name: "Uinta Basin",
    lat: 40.32,
    lng: -109.55,
    cases: "Ranch vanishments + cattle mutilation corridor, not a single NPS count",
    notes:
      "Sits against the UTTR keep-away. High-strangeness and missing overlap here more than anywhere else in the Intermountain West.",
    relatedSiteId: "skinwalker",
  },
  {
    id: "alaska-bush",
    name: "Alaska bush / North Slope",
    lat: 66.5,
    lng: -150.0,
    cases: "1,300+ active missing in a state of ~730,000 people",
    notes:
      "The rate is the signal. Wrangell–St. Elias, Gates of the Arctic, village travel, and the North Slope all feed it. ANWR sits inside this envelope.",
    relatedSiteId: "anwr",
  },
  {
    id: "death-valley",
    name: "Death Valley / Mojave edge",
    lat: 36.47,
    lng: -116.87,
    cases: "Heat deaths plus a thinner true-vanishing set along the China Lake fence",
    notes:
      "Official cause is often environment. Paulides still flags desert cases that do not fit heat stroke. Adjacent to the China Lake keep-away.",
    relatedSiteId: "china-lake",
  },
  {
    id: "cascades",
    name: "North Cascades / Glacier Peak",
    lat: 48.5,
    lng: -121.2,
    cases: "Forest Service / park cluster in the Paulides Northwest set",
    notes:
      "Overlays the locked $56B copper of Glacier Peak Wilderness.",
    relatedSiteId: "glacier-peak",
  },
  {
    id: "bennington",
    name: "Bennington Triangle",
    lat: 43.07,
    lng: -73.12,
    cases: "1940s–50s cluster (five disappearances) still unsolved",
    notes:
      "Eastern Glastenbury Mountain. Not a resource lock. Included as a historical Type-3 scarecrow pattern.",
  },
];

export const PAULIDES_MARKERS = [
  "Sudden vanishing of competent people",
  "Geographic clusters, not random scatter",
  "Bodies found in previously searched ground, or never",
  "Boulder fields, berry bushes, creeks, and edge-of-clearing",
  "Dogs lose the scent",
  "Bad weather arriving as if on cue",
  "Disabled electronics in the search",
];
