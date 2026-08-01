# GTechDistribution

Bilingual (EN/KA) corporate website for GTechDistribution, a technology hardware
distributor starting with SSDs. Built with Next.js (App Router), TypeScript, and
Tailwind CSS.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — brand tokens (`navy`, `copper`, `ink`, etc.) defined in
  `tailwind.config.ts`
- **next/font** — Space Grotesk (display), Inter (body), IBM Plex Mono (specs/data)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/en` (or `/ka` if your browser
sends `Accept-Language: ka` first).

```bash
npm run build
npm run start
```

## Internationalization

- Translation strings live in `/locales/en.json` and `/locales/ka.json` — no
  copy is hardcoded into components.
- Routes are locale-prefixed: `/en`, `/ka`, `/en/products`, `/ka/products`, etc.,
  via the `src/app/[lang]` dynamic segment.
- `src/middleware.ts` redirects `/` and un-prefixed paths to the detected or
  default locale.
- `src/lib/dictionaries.ts` loads the right JSON file per request on the server
  — dictionaries never ship an unused-locale bundle to the client.
- To add a language: drop a new `/locales/xx.json` (same shape as `en.json`),
  add `"xx"` to `locales` in `src/lib/dictionaries.ts`.

## Pages

| Route | Purpose |
|---|---|
| `/[lang]` | Home — hero, why us, product teaser, quality, industries, contact CTA |
| `/[lang]/products` | Full SSD + memory spec tables |
| `/[lang]/faq` | FAQ accordion |
| `/[lang]/contact` | Quote request form |

## Content notes / things to finish before launch

- **Contact form is front-end only.** `src/components/ContactForm.tsx` simulates
  a submission with a timeout — wire it to a real endpoint (an API route that
  sends email, or a service like Formspree/Resend) before relying on it.
- **Product photography is still needed.** Product cards currently show
  spec/text only, no images — see `src/components/ProductCard.tsx`. Drop
  finished product photos into `public/images/products/` and reference them
  there once available.
- **Certification badges** in the Quality section are typographic (not the
  official CE/ISO/FCC mark artwork) — swap in real certificate documents/PDFs
  once you have them to link to.
- **Logo**: `public/images/logo-mark.svg` and `src/app/icon.svg` currently use
  the "chip mark" concept. Swap in your final chosen logo file.
- Pricing, checkout, and cart are intentionally not implemented — this is a
  catalog + quote-request site by design.

## Design system

Colors, fonts, and spacing conventions are defined in `tailwind.config.ts` and
`src/app/globals.css`. The visual language ("datasheet precision"): graphite
ink on cool white, a copper-trace accent color, Space Grotesk for headlines,
IBM Plex Mono for specs — deliberately avoiding generic "AI blue."
