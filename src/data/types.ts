export type AccessKind =
  | "military-lethal"
  | "military-restricted"
  | "doe-nuclear"
  | "tribal-closed"
  | "wilderness-locked"
  | "navy-maritime"
  | "private-ranch"
  | "mixed-public";

export type Resource = {
  commodity: string;
  status: string;
  estimate?: string;
};

export type ScoreKey =
  | "restriction"
  | "resources"
  | "missing"
  | "subsurface"
  | "uap"
  | "darkness";

export type Scores = Record<ScoreKey, number>;

export type Site = {
  id: string;
  name: string;
  shortName: string;
  region: string;
  lat: number;
  lng: number;
  primary: boolean;
  access: AccessKind;
  acres: number;
  acresLabel: string;
  restrictionNote: string;
  resources: Resource[];
  missing: {
    rateLabel: string;
    notes: string;
    anomaly: number;
  };
  habitat: string[];
  uapLore: string;
  jacksonAngle: string;
  scores: Scores;
  nearby: string[];
  publicObservation: string;
  sources: string[];
  summary: string;
};

export type NetworkNode = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  kind: "keepaway" | "watch" | "sphere-hub" | "crop" | "uso";
  siteId?: string;
};

export type FiberLink = {
  from: string;
  to: string;
  layer: 1 | 2 | 3;
};

export type MissingCluster = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  cases: string;
  notes: string;
  relatedSiteId?: string;
};

export type LocatorWeights = Scores;
