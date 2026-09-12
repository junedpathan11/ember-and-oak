import type { ElementType, ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  children: ReactNode;
  as?: ElementType;
  size?: "lg" | "xl";
  align?: "left" | "center";
  className?: string;
}

/**
 * Eyebrow label stacked over a Fraunces display heading — the recurring
 * section opener used across the site.
 */
export default function SectionHeading({
  eyebrow,
  children,
  as: Tag = "h2",
  size = "lg",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className}`.trim()}
    >
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Tag className={size === "xl" ? "display-xl" : "display-lg"}>{children}</Tag>
    </div>
  );
}
