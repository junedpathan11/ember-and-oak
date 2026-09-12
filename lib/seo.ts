import type { Metadata } from "next";
import site from "@/content/site";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in the deployment environment
 * (Vercel provides the production domain) so canonical/OG URLs are absolute.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://emberandoak.vercel.app"
).replace(/\/$/, "");

/** Shared OG image — dedicated 1200x630 social card. */
export const ogImage = "/images/og-default.jpg";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  /** Bypass the "%s · Ember & Oak" template (used by the home page). */
  absoluteTitle?: boolean;
}

/**
 * Builds per-page metadata with a canonical URL and Open Graph/Twitter cards.
 * `title` is used verbatim as the document title, so each page stays unique.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = ogImage,
  imageAlt = "Ember & Oak — Wood-fired Indian grill in Surat",
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.business.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  };
}

/**
 * Converts the human-readable hours in site.ts into schema.org
 * openingHoursSpecification entries.
 */
function openingHours() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "12:00",
      closes: "15:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "19:00",
      closes: "23:00",
    },
  ];
}

/** Restaurant JSON-LD, injected on the home page. */
export function restaurantJsonLd() {
  const { business } = site;

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: business.name,
    description: business.description,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    image: `${siteUrl}${ogImage}`,
    servesCuisine: ["Indian", "North Indian", "Barbecue"],
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    foundingDate: business.established,
    address: {
      "@type": "PostalAddress",
      streetAddress: "21, Ghod Dod Road, Athwa",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      postalCode: "395007",
      addressCountry: "IN",
    },
    openingHoursSpecification: openingHours(),
    acceptsReservations: `${siteUrl}/reserve`,
    hasMenu: `${siteUrl}/menu`,
  };
}

/** Menu JSON-LD, injected on /menu. */
export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: `${site.business.name} Menu`,
    inLanguage: "en-IN",
    hasMenuSection: site.menu.map((category) => ({
      "@type": "MenuSection",
      name: category.label,
      hasMenuItem: category.dishes.map((dish) => ({
        "@type": "MenuItem",
        name: dish.name,
        description: dish.desc,
        image: `${siteUrl}${dish.image}`,
        offers: {
          "@type": "Offer",
          price: dish.price,
          priceCurrency: "INR",
        },
        suitableForDiet: dish.veg
          ? "https://schema.org/VegetarianDiet"
          : undefined,
      })),
    })),
  };
}

/** Breadcrumb JSON-LD for interior pages. */
export function breadcrumbJsonLd(label: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${siteUrl}${path}`,
      },
    ],
  };
}
