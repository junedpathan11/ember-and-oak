import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/content/site";
import site from "@/content/site";

interface MenuRowProps {
  dish: Dish;
}

/**
 * Editorial menu row: 72px square thumbnail on the left,
 * dish name — dotted leader — price on the right, description beneath.
 * Hover shifts the dish name to the primary accent colour.
 */
export default function MenuRow({ dish }: MenuRowProps) {
  return (
    <li className="group flex items-start gap-4 border-t py-6 first:border-t-0 sm:gap-5 md:py-7">
      {/* 72px thumbnail with fixed dimensions and sensible size to optimize network payload */}
      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-button border border-hairline bg-surface">
        <Image
          src={dish.image}
          alt={dish.alt}
          width={72}
          height={72}
          sizes="72px"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2 sm:gap-3">
          <h3 className="font-display text-[18px] leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-primary sm:text-[20px]">
            {dish.name}
            {dish.veg ? (
              <span className="ml-2 align-middle font-sans text-[11px] font-normal tracking-[0.08em] text-muted sm:text-[12px]">
                {site.menuPage.vegTag}
              </span>
            ) : null}
          </h3>

          {/* Dotted leader fills the space between name and price */}
          <span
            aria-hidden="true"
            className="mb-[3px] min-w-4 flex-1 self-end border-b border-dotted border-hairline sm:min-w-6"
          />

          <p className="shrink-0 font-display text-[18px] leading-tight tabular-nums sm:text-[20px]">
            ₹{dish.price}
          </p>
        </div>

        <p className="mt-1.5 max-w-prose text-[14px] leading-relaxed text-muted sm:text-[15px]">
          {dish.desc}
        </p>

        <Link
          href={`/reserve?dish=${encodeURIComponent(dish.name)}`}
          aria-label={`Reserve a table for ${dish.name}`}
          className="label-caps mt-2 inline-flex min-h-11 items-center border-b border-ink transition-colors duration-300 hover:border-primary hover:text-primary"
        >
          Reserve a table
        </Link>
      </div>
    </li>
  );
}
