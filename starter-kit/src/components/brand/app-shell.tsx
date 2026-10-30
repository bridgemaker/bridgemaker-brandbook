"use client";

import { useCallback, useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * AppShell — Floating Sidebar für interne Tools (guidelines/09 §9.12).
 *
 * Optik kommt komplett aus dem Rezept `bm-sidenav` in tokens.css:
 * Glas-Insel links, einklappbar zur Pill-Säule, auf Mobile als
 * Insel unten. Diese Komponente liefert nur Verhalten: Zustand
 * (gemerkt, ⌘B / Strg+B), Radix-Tooltips im eingeklappten Zustand,
 * Unterpunkte unter dem aktiven Eintrag.
 */

export type NavChild = { key: string; label: string };
export type NavItem = {
  key: string;
  label: string;
  /** Lucide-Icon, z. B. <LayoutDashboard /> */
  icon: React.ReactNode;
  /** Noch nicht verfügbar: ausgegraut, mit „Bald"-Badge */
  soon?: boolean;
  /** Unterpunkte, sichtbar wenn der Eintrag aktiv ist */
  children?: NavChild[];
};

const STORAGE_KEY = "bm-sidenav";

function Icon({ name }: { name: React.ReactNode }) {
  return (
    <span className="bm-sidenav-icon" aria-hidden="true">
      {name}
    </span>
  );
}

/** Tooltip nur im eingeklappten Zustand — sonst steht das Label daneben. */
function WithTip({
  label,
  show,
  children,
}: {
  label: string;
  show: boolean;
  children: React.ReactElement;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {show && (
        <TooltipContent side="right" sideOffset={12}>
          {label}
        </TooltipContent>
      )}
    </Tooltip>
  );
}

export function AppShell({
  items,
  footerItems = [],

  user,
  active,
  activeChild,
  onNavigate,
  children,
}: {
  items: NavItem[];
  footerItems?: NavItem[];
  user?: { name: string; initials: string };
  active: string;
  activeChild?: string;
  onNavigate: (key: string, child?: string) => void;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  // Zustand merken; erst nach dem Mount lesen (SSR rendert ausgeklappt)
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "collapsed") setCollapsed(true);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "collapsed" : "expanded");
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const renderItem = (item: NavItem) => {
    const isActive = item.key === active;
    const button = (
      <button
        type="button"
        className="bm-sidenav-item"
        aria-current={isActive ? "page" : undefined}
        aria-disabled={item.soon || undefined}
        onClick={item.soon ? undefined : () => onNavigate(item.key)}
      >
        <Icon name={item.icon} />
        <span className="bm-sidenav-label">{item.label}</span>
        {item.soon && <span className="bm-badge">Bald</span>}
      </button>
    );
    const trigger = (
      <WithTip label={item.soon ? `${item.label} (bald)` : item.label} show={collapsed}>
        {button}
      </WithTip>
    );

    if (isActive && item.children?.length) {
      return (
        <div key={item.key} className="bm-sidenav-block">
          {trigger}
          <div className="bm-sidenav-sub">
            {item.children.map((c) => (
              <button
                key={c.key}
                type="button"
                className="bm-sidenav-subitem"
                aria-current={c.key === activeChild ? "page" : undefined}
                onClick={() => onNavigate(item.key, c.key)}
                title={c.label}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return <div key={item.key}>{trigger}</div>;
  };

  return (
    <div className="bm-app" data-sidenav={collapsed ? "collapsed" : "expanded"}>
      <nav className="bm-sidenav" aria-label="Hauptnavigation">
        <div className="bm-sidenav-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bm-sidenav-wordmark" src="/logos/wordmark-black.svg" alt="Bridgemaker" />
          <span className="bm-sidenav-mark" role="img" aria-label="Bridgemaker" />
        </div>

        <div className="bm-sidenav-scroll">
          <div className="bm-sidenav-group">{items.map(renderItem)}</div>
        </div>

        <div className="bm-sidenav-divider" role="presentation" />

        <div className="bm-sidenav-group">
          {footerItems.map(renderItem)}
          {user && (
            <WithTip label={user.name} show={collapsed}>
              <div className="bm-sidenav-user" tabIndex={collapsed ? 0 : -1}>
                <span className="bm-sidenav-avatar" aria-hidden="true">
                  {user.initials}
                </span>
                <span className="bm-sidenav-label">{user.name}</span>
              </div>
            </WithTip>
          )}
          <WithTip label="Navigation ausklappen (⌘B)" show={collapsed}>
            <button
              type="button"
              className="bm-sidenav-item"
              aria-expanded={!collapsed}
              onClick={toggle}
            >
              <Icon name={collapsed ? <PanelLeftOpen /> : <PanelLeftClose />} />
              <span className="bm-sidenav-label">Navigation einklappen</span>
            </button>
          </WithTip>
        </div>
      </nav>

      <nav className="bm-bottomnav" aria-label="Hauptnavigation">
        {[...items, ...footerItems]
          .filter((i) => !i.soon)
          .map((i) => (
            <button
              key={i.key}
              type="button"
              className="bm-sidenav-item"
              aria-label={i.label}
              aria-current={i.key === active ? "page" : undefined}
              onClick={() => onNavigate(i.key)}
            >
              <Icon name={i.icon} />
            </button>
          ))}
      </nav>

      <main className="bm-app-main">{children}</main>
    </div>
  );
}
