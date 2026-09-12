# Ember & Oak

> **⚠️ Concept demo website.** Ember & Oak is a **fictional restaurant**. This
> is a portfolio/design piece — the address, phone number, email and reviews are
> invented, and no reservation made here reaches anybody. A dismissible notice
> saying so appears at the top of every page.

A production-quality marketing site for an imagined wood-fired Indian grill in
Surat. Editorial layout, warm cream palette, hairline rules, restrained motion.

![Home](public/images/hero-grill.jpg)

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, static generation) |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| Motion | framer-motion (scroll fade-up only) |
| Icons | lucide-react |
| Fonts | Fraunces + Inter via `next/font/google` |
| Forms | Web3Forms (no backend, no database) |
| Deploy target | Vercel |

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then add your Web3Forms key (see below)
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build — must pass clean
npm run start    # serve the production build
npm run lint     # eslint
```

---

## Where to put your Web3Forms key

The two forms (`/reserve` and `/private-dining`) post to
[Web3Forms](https://web3forms.com). They ship **disabled** until you supply a key.

1. Get a free access key at <https://web3forms.com> (enter the inbox you want
   the enquiries delivered to — Web3Forms emails you the key).
2. Open **`.env.local`** in the project root and replace the placeholder:

   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=paste-your-real-access-key-here
   ```

   `.env.local` already exists (copy it from `.env.example` if not). It is
   **gitignored and must never be committed**; `.env.example` is the committed
   template.
3. Restart the dev server — `NEXT_PUBLIC_*` values are inlined at build time.
4. On Vercel, add the same variable under
   **Project → Settings → Environment Variables**, then redeploy.

**Until a real key is present**, both forms render an inline notice —
*"Form not configured — add your Web3Forms access key to .env.local."* — and the
submit button stays disabled. The success state is only ever shown after a
confirmed **HTTP 200** with `success: true` from the API; failures surface the
API's own message plus a WhatsApp fallback link.

Optional: set `NEXT_PUBLIC_SITE_URL` to your production domain so canonical and
Open Graph URLs are absolute (defaults to `https://emberandoak.vercel.app`).

---

## Editing content

**All business content lives in [`content/site.ts`](content/site.ts)**, typed by
the `SiteConfig` interface. Components never hardcode copy, prices, hours or
links — change the menu, testimonials, hours or contact details there and every
page updates.

```ts
export const site: SiteConfig = {
  business: { name: "Ember & Oak", phone: "+91 90000 00000", ... },
  menu: [ { id: "starters", label: "Starters", dishes: [...] }, ... ],
  ...
};
```

### Design tokens

Tokens are declared once as CSS variables in
[`app/globals.css`](app/globals.css) and mapped to Tailwind utilities in
[`tailwind.config.ts`](tailwind.config.ts). Components use the semantic classes
(`bg-bg`, `text-ink`, `text-muted`, `bg-primary`, `border-hairline`,
`font-display`) — there are **no hardcoded hex values in components**.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#FAF7F2` | warm cream page background |
| `--color-surface` | `#FFFFFF` | cards and panels |
| `--color-ink` | `#1C1917` | primary text |
| `--color-muted` | `#78716C` | secondary text |
| `--color-primary` | `#B45309` | buttons and accents only |
| `--color-hairline` | `#E7E5E4` | 1px dividers |

---

## Structure

```
app/
  (pages)/
    page.tsx                 /                home
    menu/page.tsx            /menu
    reserve/page.tsx         /reserve
    private-dining/page.tsx  /private-dining
  layout.tsx                 shell: demo banner, navbar, footer, FAB
  globals.css                design tokens + keyframes
  fonts.ts                   Fraunces + Inter
  not-found.tsx              custom 404
  sitemap.ts  robots.ts
components/
  blocks/                    Navbar, Hero, Marquee, DishStrip, AboutTeaser,
                             Testimonials, HoursLocation, CTABanner, Footer,
                             WhatsAppFab, DemoBanner, MenuTabs, ReserveForm,
                             EnquiryForm, FormNotice
  ui/                        Button, SectionHeading, MenuRow, DishImage,
                             Field, FadeUp, JsonLd
content/site.ts              all business data (SiteConfig)
lib/
  seo.ts                     metadata builder + JSON-LD generators
  forms.ts                   Web3Forms key guard, submit, validators
  tokens.ts                  token values for non-CSS contexts (theme-color)
public/images/               photography
```

---

## Accessibility & SEO

- Semantic landmarks, one `<h1>` per page, skip-to-content link.
- Every input has a `<label>`; errors are wired via `aria-invalid` /
  `aria-describedby` and announced with `role="alert"`.
- Menu tabs follow the ARIA tabs pattern with arrow-key roving focus.
- Visible `focus-visible` rings; inputs are 16px to prevent iOS zoom.
- Contrast meets WCAG AA: ink on cream 16.4:1, muted on cream 4.49:1,
  primary `#B45309` on cream 4.7:1, cream on primary 4.7:1.
- `prefers-reduced-motion` disables all animation.
- Unique title/description/canonical per page, Open Graph + Twitter cards,
  `Restaurant` / `Menu` / `BreadcrumbList` JSON-LD, sitemap and robots.

---

## Known limitations

- **Fictional business.** Content, reviews and contact details are invented.
- **Request-only forms.** No availability engine — submissions are enquiries;
  there is no booking confirmation, calendar or payment.
- **Photography is AI-generated** and stored in `public/images`. The brief
  referenced Unsplash source images (e.g.
  `images.unsplash.com/photo-1555939594-58d7cb561ad1`); local files are used
  instead so the site has no third-party runtime image dependency. To use remote
  images, swap the `image` fields in `content/site.ts` and add the host to
  `images.remotePatterns` in `next.config.ts`.
- **No dark mode, i18n, CMS, cart, accounts or cookie banner** — deliberately
  out of scope.
- The Google Maps embed is a plain `iframe`; it sets Google cookies once loaded.

---

## Licence

Demo/portfolio use. "Ember & Oak" is not a real business.
