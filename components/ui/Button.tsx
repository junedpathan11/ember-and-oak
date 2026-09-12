import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghost-light";

const base =
  "label-caps inline-flex items-center justify-center gap-2 rounded-button border px-7 py-[14px] text-center font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Solid burnt amber, cream text.
  primary:
    "border-primary bg-primary text-bg hover:border-ink hover:bg-ink enabled:active:bg-ink",
  // 1px ink border, ink text.
  ghost: "border-ink bg-transparent text-ink hover:bg-ink hover:text-bg",
  // Ghost on dark/photographic backgrounds.
  "ghost-light": "border-bg bg-transparent text-bg hover:bg-bg hover:text-ink",
};

interface StyleProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = StyleProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps> & { href?: never };

type ButtonAsLink = StyleProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof StyleProps | "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The single button primitive: uppercase 12px / 0.15em tracking / 14px 28px
 * padding / 4px radius, per the design system. Renders a next/link for
 * internal hrefs, an <a> for external ones, otherwise a <button>.
 */
export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, variant = "primary", className = "", children, ...rest } = props;
    const classes = `${base} ${variants[variant]} ${className}`.trim();

    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant = "primary", className = "", children, type = "button", ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();
  // `href` is typed as `never` on this branch and is always undefined here.
  delete (rest as { href?: undefined }).href;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
