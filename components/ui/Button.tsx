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

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The single button primitive: uppercase 12px / 0.15em tracking / 14px 28px
 * padding / 4px radius, per the design system. Renders an <a>, a next/link or
 * a <button> depending on `href`.
 */
export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _variant, className: _className, children: _children, ...rest } = props;
    void _variant;
    void _className;
    void _children;

    const isInternal = href.startsWith("/");

    if (isInternal) {
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

  const { variant: _v, className: _c, children: _ch, type, ...rest } = props as ButtonAsButton;
  void _v;
  void _c;
  void _ch;

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
