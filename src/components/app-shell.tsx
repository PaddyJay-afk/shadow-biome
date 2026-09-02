import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Atlas" },
  { to: "/keepaway", label: "Ranges" },
  { to: "/theory", label: "Theory" },
  { to: "/vallee", label: "Vallée" },
  { to: "/grid", label: "Grid" },
  { to: "/strobe", label: "Strobe" },
  { to: "/locator", label: "Locator" },
  { to: "/missing", label: "Missing" },
  { to: "/connect", label: "Links" },
  { to: "/field", label: "Notes" },
  { to: "/library", label: "Sources" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/95">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link to="/" className="shrink-0">
            <span className="font-display text-xl tracking-tight text-fg">Shadow Biome</span>
          </Link>
          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-0 overflow-x-auto lg:flex">
            {NAV.map((item) => {
              const on =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "shrink-0 rounded-md px-1.5 py-2 text-xs transition-colors duration-150",
                    on ? "text-accent" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        {open ? (
          <nav className="grid gap-1 border-t border-border px-3 py-3 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-fg hover:bg-surface-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      <div id="main">{children}</div>
    </div>
  );
}
