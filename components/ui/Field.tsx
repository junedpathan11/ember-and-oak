import type { ReactNode } from "react";

export const fieldClasses =
  "w-full rounded-button border border-hairline bg-surface px-4 py-3 text-[16px] text-ink transition-colors duration-300 placeholder:text-muted focus:border-ink focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Label + control + inline error. Every input on the site is wrapped in this
 * so labelling and error wiring stay consistent.
 */
export default function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow mb-2 block text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-primary">
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>

      {children}

      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-[13px] text-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] text-primary">
          {error}
        </p>
      ) : null}
    </div>
  );
}
