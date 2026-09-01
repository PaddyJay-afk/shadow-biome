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
      className="group flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[background-color] duration-150 hover:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{site.region}</p>
          <h3 className="mt-1 font-display text-2xl leading-tight text-fg">{site.shortName}</h3>
        </div>
        <span className="font-mono text-sm tabular-nums text-accent">{shown}</span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{site.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone={site.primary ? "accent" : "muted"}>{site.primary ? "Primary" : "Watch"}</Badge>
        <Badge>{ACCESS_LABEL[site.access]}</Badge>
      </div>
    </Link>
  );
}
