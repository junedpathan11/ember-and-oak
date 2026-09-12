"use client";

import { useId, useState } from "react";
import MenuRow from "@/components/ui/MenuRow";
import site from "@/content/site";

/**
 * Client-side category switcher. Tabs follow the ARIA tabs pattern with
 * roving focus; the active tab is marked by an ink underline.
 */
export default function MenuTabs() {
  const [active, setActive] = useState(site.menu[0].id);
  const baseId = useId();

  function activateTab(index: number) {
    const next = site.menu[(index + site.menu.length) % site.menu.length];
    setActive(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = index + 1;
    if (event.key === "ArrowLeft") nextIndex = index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = site.menu.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    activateTab(nextIndex);
  }

  return (
    <div>
      {/* Tabs scroll horizontally on narrow screens rather than wrapping. */}
      <div
        role="tablist"
        aria-label="Menu categories"
        className="-mx-5 flex gap-7 overflow-x-auto border-b px-5 sm:mx-0 sm:px-0"
      >
        {site.menu.map((category, index) => {
          const selected = category.id === active;

          return (
            <button
              key={category.id}
              id={`${baseId}-tab-${category.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(category.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`label-caps -mb-px min-h-11 shrink-0 border-b-2 py-4 transition-colors duration-300 ${
                selected
                  ? "border-ink text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {site.menu.map((category) => {
        const selected = category.id === active;

        return (
          <div
            key={category.id}
            id={`${baseId}-panel-${category.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${category.id}`}
            tabIndex={selected ? 0 : -1}
            hidden={!selected}
            className="focus-visible:outline-none"
          >
            <h2 className="sr-only">{category.label}</h2>
            <ul className="mt-2">
              {category.dishes.map((dish) => (
                <MenuRow key={dish.slug} dish={dish} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
