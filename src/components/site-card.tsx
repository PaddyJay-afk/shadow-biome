import { Link } from "@tanstack/react-router";
import { ACCESS_LABEL, overallScore } from "@/data/sites";
import type { Site } from "@/data/types";
import { Badge } from "@/components/ui/badge";

export function SiteCard({ site, score }: { site: Site; score?: number }) {
  const shown = score ?? overallScore(site.scores);
  return (
    <Link
      to="/sites/$id"
      params={{ id: site.id }}
      className="flex flex-col bg-bg p-5 transition-colors duration-150 hover:bg-surface"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] text-subtle">{site.region}</p>
          <h3 className="mt-1 text-base font-medium text-fg">{site.shortName}</h3>
        </div>
        <span className="font-mono text-[13px] tabular-nums text-muted">{shown}</span>
      </div>
      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{site.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge tone={site.primary ? "accent" : "muted"}>{site.primary ? "Primary" : "Watch"}</Badge>
        <Badge>{ACCESS_LABEL[site.access]}</Badge>
      </div>
    </Link>
  );
}
