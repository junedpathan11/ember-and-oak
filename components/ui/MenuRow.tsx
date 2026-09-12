import type { Dish } from "@/content/site";
import site from "@/content/site";

interface MenuRowProps {
  dish: Dish;
}

/**
 * A single editorial menu row: name — dotted leader — price on one line,
 * description beneath. Hover shifts the dish name to the primary colour.
 */
export default function MenuRow({ dish }: MenuRowProps) {
  return (
    <li className="group border-t py-6 first:border-t-0 md:py-7">
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-[20px] leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-primary">
          {dish.name}
          {dish.veg ? (
            <span className="ml-2 align-middle font-sans text-[12px] tracking-[0.08em] text-muted">
              {site.menuPage.vegTag}
            </span>
          ) : null}
        </h3>

        {/* Dotted leader fills the space between name and price. */}
        <span
          aria-hidden="true"
          className="mb-[3px] min-w-6 flex-1 self-end border-b border-dotted border-hairline"
        />

        <p className="font-display text-[20px] leading-tight tabular-nums">
          ₹{dish.price}
        </p>
      </div>

      <p className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-muted">
        {dish.desc}
      </p>
    </li>
  );
}
