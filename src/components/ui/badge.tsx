import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "accent" | "warn" | "danger";
  children: ReactNode;
}) {
  const tones = {
    muted: "text-muted border-border",
    accent: "text-accent border-accent/30",
    warn: "text-warn border-warn/30",
    danger: "text-danger border-danger/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-px text-[11px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
