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
    muted: "text-muted bg-surface-2",
    accent: "text-accent-fg bg-accent",
    warn: "text-accent-fg bg-warn",
    danger: "text-fg bg-danger/20 text-danger",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
