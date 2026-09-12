import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import site from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for is no longer on the pass.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const { notFound } = site;

  return (
    <section className="mx-auto flex min-h-[62svh] max-w-shell flex-col justify-center px-5 py-20 sm:px-8">
      <p className="eyebrow">Error 404</p>

      <h1 className="display-xl mt-4 max-w-[16ch] italic">{notFound.heading}</h1>

      <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
        {notFound.body}
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button href={notFound.ctaHref} variant="primary">
          {notFound.cta}
        </Button>
        <Button href="/menu" variant="ghost">
          View the menu
        </Button>
      </div>
    </section>
  );
}
