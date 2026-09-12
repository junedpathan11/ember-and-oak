"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import site from "@/content/site";

const STORAGE_KEY = "eo-demo-banner-dismissed";

/**
 * Slim, non-sticky bar at the very top of every page making it unmistakable
 * that this is a fictional portfolio demo. Dismissal persists in localStorage.
 */
export default function DemoBanner() {
  // Start hidden and reveal after the storage check to avoid a flash for
  // visitors who already dismissed it.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Deferred a frame so the state update is not synchronous inside the
    // effect, which would trigger a cascading render.
    const id = window.requestAnimationFrame(() => {
      try {
        setVisible(window.localStorage.getItem(STORAGE_KEY) !== "true");
      } catch {
        // localStorage unavailable (private mode) — show the notice anyway.
        setVisible(true);
      }
    });

    return () => window.cancelAnimationFrame(id);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Non-fatal: the banner simply returns on the next visit.
    }
  }

  if (!visible) return null;

  return (
    <div className="border-b bg-bg">
      <div className="relative mx-auto flex max-w-shell items-center justify-center px-10 py-2 sm:px-12">
        <p className="text-center text-[11px] uppercase leading-normal tracking-[0.15em] text-muted">
          {site.business.demoLabel}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss demo notice"
          className="absolute right-2 flex h-7 w-7 items-center justify-center text-muted transition-colors duration-300 hover:text-ink sm:right-4"
        >
          <X size={13} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
