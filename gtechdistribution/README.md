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
`src/app/globals.css`. The visual language ("lit board") is sampled from the
hero photograph in `public/images/hero-chip.jpg`: navy board, electric blue
trace, and the warm amber glow off the lit die. Space Grotesk for headlines,
IBM Plex Mono for specs and data.

The page alternates dark and light bands rather than committing to either:

| band | ground |
|---|---|
| Hero | dark, over the photograph |
| Why us | white |
| Products | page ground |
| Quality | dark |
| Industries | page ground |
| Closing CTA + footer | dark |

The palette has **two contexts**, and mixing them breaks legibility:

- **Light** (`bg`, `surface`, `band`, `ink`, `inkSoft`, `line`, `field`,
  `accent`, `accentText`, `accentSoft`, `alert`). `accent` is the brand
  copper `#C9862E` and is a **fill only** — the logo mark, buttons, rules. At
  3.03:1 on white it cannot carry text, so small copper text uses
  `accentText`, the same hue darkened. Copper fills take an `ink` label, never
  a white one. `alert` is a true red so it stays distinct from the copper.
- **Dark** (`deep`, `deepAlt`, `deepInk`, `deepInkSoft`, `deepLine`, `trace`,
  `ember`). `trace` is the image's brighter blue and `ember` its amber; both
  are legible only on a dark ground and must never be used on light.

Two rules keep the palette legible:

- **The signal color means "act on this."** `accent` on light and `trace` on
  dark are reserved for buttons and the active language toggle.
  Non-interactive emphasis uses a band with a hairline, never a filled block.
- **Warmth is rationed.** `ember` marks small accents on dark grounds only,
  and `alert` is reserved for failure states, so a problem never reads as the
  same signal as a call to action.
- **Note the split.** Light-ground calls to action are orange (`accent`);
  dark-ground ones are still blue (`trace`). Switching `trace` to `ember`
  would make every call to action warm.

Every text pair clears WCAG AA against its own ground (worst 4.77:1), and
`field` exists so form borders meet the 3:1 required of UI boundaries.
`deepLine` is a decorative divider and is deliberately below that threshold.
