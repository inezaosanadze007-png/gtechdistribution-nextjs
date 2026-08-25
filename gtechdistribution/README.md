# GTechDistribution

Bilingual (EN/KA) corporate website for GTechDistribution, a technology hardware
distributor starting with SSDs. Built with Next.js (App Router), TypeScript, and
Tailwind CSS.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — brand tokens (`bg`, `band`, `surface`, `ink`, `accent`,
  etc.) defined in `tailwind.config.ts`
- **next/font** — Space Grotesk (display), Inter (body), IBM Plex Mono (specs/data)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/ka`. Georgian is the primary
language; English is reachable via the language switcher or an explicit `/en`
path.

```bash
npm run build
npm run start
```

## Internationalization

- Translation strings live in `/locales/en.json` and `/locales/ka.json` — no
  copy is hardcoded into components.
- Routes are locale-prefixed: `/en`, `/ka`, `/en/products`, `/ka/products`, etc.,
  via the `src/app/[lang]` dynamic segment.
- `src/middleware.ts` redirects `/` and un-prefixed paths to the default
  locale (`ka`), regardless of the visitor's `Accept-Language`.
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

- **Contact form needs its access key set.** Quote requests are delivered via
  `src/app/api/contact/route.ts` through [Web3Forms](https://web3forms.com).
  Get a key by entering `Gtech.distribution@outlook.com` on their site (no
  account is created — the key is emailed to you), then set
  `WEB3FORMS_ACCESS_KEY` in your host's environment and redeploy. Until you do,
  the form shows an error rather than accepting requests. Requests arrive at
  whichever address the key was issued to.
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
`src/app/globals.css`. The visual language ("lit board"): the palette is
sampled from the hero photograph in `public/images/hero-circuit.jpg` — indigo
substrate (`bg`, `band`, `surface`), cyan trace glow (`accent`), and the violet
bleed in the image's corner (`violet`), which appears only in the hero scrim.
Space Grotesk for headlines, IBM Plex Mono for specs and data.

Two rules keep the palette legible:

- **`accent` means "act on this."** Cyan fills are reserved for buttons and the
  active language toggle. Non-interactive emphasis uses `band` with an
  `accent` hairline, never a cyan fill.
- **`alert` is the only warm value** and is reserved for failure states, so a
  problem never reads as the same signal as a call to action.
