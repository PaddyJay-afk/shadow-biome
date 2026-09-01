import { cn } from "@/lib/utils";

export function ScoreBar({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1", className)}>
      <span className="text-xs text-muted">{label}</span>
      <span className="font-mono text-xs tabular-nums text-fg">{value}</span>
      <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
