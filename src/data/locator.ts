import { SITES, overallScore } from "./sites";
import type { LocatorWeights, Site } from "./types";

export const DEFAULT_WEIGHTS: LocatorWeights = {
  restriction: 80,
  resources: 70,
  missing: 60,
  subsurface: 75,
  uap: 65,
  darkness: 55,
};

export type RankedSite = Site & { locator: number; baseline: number };

export function rankSites(weights: LocatorWeights, primaryOnly = false): RankedSite[] {
  const sum =
    weights.restriction +
    weights.resources +
    weights.missing +
    weights.subsurface +
    weights.uap +
    weights.darkness || 1;

  const pool = primaryOnly ? SITES.filter((s) => s.primary) : SITES;

  return pool
    .map((site) => {
      const locator = Math.round(
        (site.scores.restriction * weights.restriction +
          site.scores.resources * weights.resources +
          site.scores.missing * weights.missing +
          site.scores.subsurface * weights.subsurface +
          site.scores.uap * weights.uap +
          site.scores.darkness * weights.darkness) /
          sum,
      );
      return { ...site, locator, baseline: overallScore(site.scores) };
    })
    .sort((a, b) => b.locator - a.locator);
}
