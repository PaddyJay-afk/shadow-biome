import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Orbit } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Atlas" },
  { to: "/keepaway", label: "Ranges" },
  { to: "/theory", label: "Theory" },
  { to: "/vallee", label: "Vallée" },
  { to: "/sands", label: "Sands" },
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
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-5">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <Orbit className="size-5 text-accent" aria-hidden="true" />
            <span className="text-[15px] font-medium tracking-[-0.02em] text-fg">Shadow Biome</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto lg:flex"
          >
            {NAV.map((item) => {
              const on =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 shrink-0 items-center rounded px-2 py-1 text-[13px] transition-colors duration-150",
                    on ? "bg-surface-2 text-accent" : "text-muted hover:text-fg",
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
            className="ml-auto size-11 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
        {open ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="grid max-h-[calc(100dvh-64px)] grid-cols-2 overflow-y-auto border-t border-border px-3 py-2 lg:hidden"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2.5 text-sm text-fg hover:bg-surface-2"
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
