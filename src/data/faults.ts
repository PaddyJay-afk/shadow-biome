/** Major active plate boundaries and intraplate seismic zones. [lat, lng][]. */

export type FaultZone = {
  id: string;
  name: string;
  kind: "transform" | "subduction" | "rift" | "intraplate";
  path: [number, number][];
};

export const FAULTS: FaultZone[] = [
  {
    id: "san-andreas",
    name: "San Andreas",
    kind: "transform",
    path: [
      [40.25, -124.4],
      [38.0, -122.8],
      [36.6, -121.4],
      [35.0, -119.8],
      [34.05, -118.25],
      [33.7, -116.4],
      [32.75, -115.3],
    ],
  },
  {
    id: "cascadia",
    name: "Cascadia megathrust",
    kind: "subduction",
    path: [
      [40.4, -125.2],
      [42.5, -124.8],
      [45.0, -125.0],
      [47.5, -125.3],
      [49.2, -127.0],
      [50.8, -129.5],
    ],
  },
  {
    id: "wasatch",
    name: "Wasatch / Intermountain",
    kind: "rift",
    path: [
      [42.5, -111.9],
      [41.7, -111.85],
      [40.6, -111.88],
      [39.2, -111.7],
      [37.6, -113.1],
    ],
  },
  {
    id: "rio-grande",
    name: "Rio Grande rift",
    kind: "rift",
    path: [
      [38.2, -106.3],
      [36.9, -106.9],
      [35.5, -106.4],
      [33.3, -106.8],
      [31.8, -106.5],
    ],
  },
  {
    id: "new-madrid",
    name: "New Madrid / Reelfoot rift",
    kind: "intraplate",
    path: [
      [35.4, -90.4],
      [36.1, -89.8],
      [36.6, -89.3],
      [37.1, -89.1],
    ],
  },
  {
    id: "dead-sea",
    name: "Dead Sea Transform",
    kind: "transform",
    path: [
      [36.4, 36.3],
      [34.6, 36.2],
      [33.4, 35.8],
      [31.8, 35.5],
      [30.5, 35.2],
      [28.4, 34.6],
    ],
  },
  {
    id: "east-anatolian",
    name: "East Anatolian",
    kind: "transform",
    path: [
      [36.6, 36.2],
      [37.4, 37.4],
      [37.9, 38.5],
      [38.3, 39.8],
      [38.8, 41.2],
    ],
  },
  {
    id: "north-anatolian",
    name: "North Anatolian",
    kind: "transform",
    path: [
      [40.6, 27.2],
      [40.8, 30.5],
      [40.9, 33.5],
      [40.7, 36.5],
      [40.3, 40.0],
      [39.8, 41.8],
    ],
  },
  {
    id: "east-african-rift",
    name: "East African Rift",
    kind: "rift",
    path: [
      [14.5, 40.2],
      [11.5, 41.0],
      [9.0, 39.8],
      [3.5, 38.0],
      [0.0, 36.2],
      [-3.2, 36.0],
      [-6.2, 35.8],
      [-10.0, 34.5],
      [-15.5, 35.0],
    ],
  },
  {
    id: "himalaya",
    name: "Himalayan front",
    kind: "subduction",
    path: [
      [34.5, 73.0],
      [33.5, 76.5],
      [30.5, 80.5],
      [28.0, 84.5],
      [27.2, 87.5],
      [27.5, 90.5],
    ],
  },
  {
    id: "zagros",
    name: "Zagros",
    kind: "subduction",
    path: [
      [35.0, 45.5],
      [32.5, 48.5],
      [30.0, 52.0],
      [27.5, 55.5],
    ],
  },
  {
    id: "andes",
    name: "Andean megathrust",
    kind: "subduction",
    path: [
      [5.0, -78.5],
      [-2.0, -80.5],
      [-12.0, -77.5],
      [-18.0, -71.5],
      [-23.0, -70.5],
      [-33.5, -72.0],
      [-40.0, -74.0],
      [-46.0, -75.5],
    ],
  },
  {
    id: "mexico-volcanic",
    name: "Trans-Mexican volcanic belt",
    kind: "subduction",
    path: [
      [19.8, -105.0],
      [19.4, -102.0],
      [19.2, -99.1],
      [19.0, -97.0],
      [18.6, -95.0],
    ],
  },
  {
    id: "japan-trench",
    name: "Japan / Kuril trench",
    kind: "subduction",
    path: [
      [45.5, 151.5],
      [42.0, 145.0],
      [38.5, 143.0],
      [35.5, 141.5],
      [33.0, 141.0],
    ],
  },
  {
    id: "sumatra",
    name: "Sunda megathrust",
    kind: "subduction",
    path: [
      [6.0, 94.5],
      [2.0, 96.5],
      [-2.0, 99.5],
      [-6.0, 102.5],
      [-10.0, 107.0],
    ],
  },
  {
    id: "alpine",
    name: "Alpine",
    kind: "subduction",
    path: [
      [44.2, 7.0],
      [46.0, 9.5],
      [46.5, 13.5],
      [46.0, 16.0],
    ],
  },
];
