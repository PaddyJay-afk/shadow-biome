/** Named alignments (folk / sacred geography) plus a 72° world grid. [lat, lng][]. */

export type Ley = {
  id: string;
  name: string;
  kind: "named" | "grid";
  note: string;
  path: [number, number][];
};

export const LEYS: Ley[] = [
  {
    id: "st-michael",
    name: "St Michael line",
    kind: "named",
    note: "Watkins-class British ley: Land’s End → St Michael’s Mount → Glastonbury → Avebury → Bury. Straight on a map, not a surveyed energy cable.",
    path: [
      [50.12, -5.68],
      [50.118, -5.478],
      [51.146, -2.714],
      [51.429, -1.854],
      [52.245, 0.718],
      [52.54, 1.75],
    ],
  },
  {
    id: "giza-stonehenge",
    name: "Giza–Avebury meridian",
    kind: "named",
    note: "The Bauval/Hancock habit: Giza’s longitude almost due south of the British megalith belt. Folk geometry, not a geodesic proof.",
    path: [
      [29.979, 31.134],
      [35.0, 20.0],
      [42.0, 8.0],
      [47.59, -3.08],
      [51.179, -1.826],
      [53.695, -6.476],
    ],
  },
  {
    id: "anatolian-spine",
    name: "Anatolian spine",
    kind: "named",
    note: "Göbekli → Derinkuyu → Baalbek → Giza. The Hancock ‘sages’ corridor sitting on the Dead Sea / East Anatolian fractures.",
    path: [
      [37.223, 38.922],
      [38.376, 34.912],
      [34.007, 36.204],
      [31.87, 35.44],
      [29.979, 31.134],
      [26.184, 31.919],
    ],
  },
  {
    id: "indus-seasia",
    name: "Harappa–Angkor quiet belt",
    kind: "named",
    note: "Barnhart’s SE-Asia claim as a line: Harappa / Mohenjo-daro → Angkor → Gunung Padang, all |D| < 3°.",
    path: [
      [30.627, 72.864],
      [27.329, 68.139],
      [20.0, 85.0],
      [13.412, 103.867],
      [-6.994, 107.056],
    ],
  },
  {
    id: "mississippi-rift",
    name: "Mississippi mound line",
    kind: "named",
    note: "Poverty Point → Cahokia along the Reelfoot / New Madrid failed rift. Hancock’s America Before corridor.",
    path: [
      [32.637, -91.406],
      [35.4, -90.0],
      [38.655, -90.062],
      [39.026, -83.43],
    ],
  },
  {
    id: "andes-spine",
    name: "Andean megalith spine",
    kind: "named",
    note: "Caral → Sacsayhuamán → Tiwanaku on the megathrust. Hancock’s Altiplano ‘fingerprint’.",
    path: [
      [-10.892, -77.521],
      [-13.508, -71.982],
      [-16.555, -68.673],
    ],
  },
  {
    id: "yucatan-belt",
    name: "Yucatán–Teotihuacan",
    kind: "named",
    note: "Barnhart’s Yucatán zero sitting next to the volcanic belt that holds Teotihuacan and Cholula.",
    path: [
      [20.684, -88.568],
      [20.967, -89.593],
      [19.693, -98.844],
      [19.058, -98.302],
    ],
  },
];

/** Becker–Hagens style 72° meridians. Display-only grid, not a measured field. */
export const GRID_MERIDIANS = [-180, -108, -36, 36, 108] as const;
export const GRID_PARALLELS = [-60, -30, 0, 30, 60] as const;
