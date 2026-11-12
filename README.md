# Bishnoi One — marketing website

The public marketing site for Bishnoi One, built with React and Vite. This repo covers the
**website only** — the product applications are a separate codebase and are deliberately
not represented here beyond the abstract brand illustrations used for storytelling.

## Running it

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

No environment variables, no backend. The newsletter form in the footer is a stub.

## Design direction

The layout language follows the conventions of a modern SaaS marketing site: a sticky
header with hover mega menus, a large hero, tabbed product storytelling, card grids,
scroll-triggered motion, per-seat pricing with a billing toggle, and a full-bleed gradient
call to action. All of the branding on top of that is Bishnoi One's own.

The surface treatment is deliberately flat and white. Sections separate with hairline rules
rather than tinted bands, cards are outlined rather than floated, and hover states change a
border or a colour instead of lifting on a shadow. Weight hierarchy comes from size and
colour, not from heavy type — headings stop at semibold. The brand gradient is reserved for
the logo, gradient text, primary buttons and the closing CTA, so it stays an accent.

### Brand

| Token group | Notes |
| --- | --- |
| Signature gradient | `--grad-brand`: blue `#f36b21` → sky `#f9a03f` → green `#2e8a57`, at 115° |
| Primary | `--orbit-blue-600` `#f36b21` |
| Secondary | `--orbit-green-500` `#2e8a57` |
| Ink | `--ink-900` `#132a1e` through `--ink-400` for body and muted text |
| Accents | coral, amber and violet, one per section at most |
| Display type | Figtree at `--fw-heading` (600). Nothing on the site is bold or black |
| Body type | Inter, 400–500 (`--fw-medium`) |
| Surfaces | White throughout; `--surface-muted` `#FBFCFE` is the only tint |
| Elevation | Hairline `--ink-100` borders carry structure; shadows are near-invisible hints |
| Corners | `--r-sm` 5px to `--r-2xl` 16px. Buttons, chips and pills stay fully rounded |

Everything above lives in [src/styles/tokens.css](src/styles/tokens.css). Change a value
there and it propagates through every section — no component hard-codes a colour except
the per-product accent overrides.

[src/components/ui/OrbitLogo.jsx](src/components/ui/OrbitLogo.jsx) carries two lockups:

- `variant="lockup"` — the stacked artwork, planet over the word, from
  `public/orbit-wordmark.png`. It contains the wordmark already, so no text is drawn beside
  it. This is the navbar logo, and the bar's height (`--nav-h`) is set to give it room.
- default — the orbit mark from `public/orbit-logo.png` beside a typeset "Bishnoi One". Used in
  the footer, where a horizontal lockup sits better in a column of text.

Both, plus the favicons (`favicon-32.png`, `favicon-64.png`, `apple-touch-icon.png`), are
generated from the source artwork in `public/` (`orbitwordlogo.png` and `orbitlogo.png`).
The sources carry a soft glow in their alpha channel, which composites as a faint grey haze
around the shapes, so generating an asset means: harden the alpha to a narrow ramp
(transparent below 160, opaque above 215 — lower thresholds dilate the strokes),
median-filter the colour by 3 so the surviving rim is brand colour rather than a pale halo,
trim the transparent padding, then resize to 3x the display height. Because the marks are
not square, CSS sets a height and lets width follow; the square icons pad the mark onto a
transparent canvas. Keep the `width`/`height` attributes in `OrbitLogo.jsx` in step with
the generated files.

## Structure

```
src/
  main.jsx              entry — global styles load before any component CSS
  App.jsx               section order for the single page
  data/site.js          every string on the site
  styles/
    tokens.css          colour, type, space, radius, elevation, motion
    base.css            reset, typography, layout shell, buttons, pills
    animations.css      scroll reveals, ambient loops, reduced-motion opt-out
  hooks/                useInView, useScrollPosition, useCountUp
  components/
    ui/                 Reveal, Icon (one inline sprite), OrbitLogo
    Navbar              sticky header, hover mega menus, off-canvas drawer
    Hero                headline, product chip selector, animated orbit visual
    ProductShowcase     auto-advancing tabs for the three products
    Capabilities        platform card grid
    Spotlight           alternating story rows for automations and Bishnoi One AI
    StatsBand           dark band with counters that animate into view
    HowItWorks          four numbered steps on a connecting track
    Testimonials        single large quote with a dot carousel
    Integrations        two infinite marquee rows
    Pricing             billing toggle, seat picker, four tiers, enterprise strip
    Faq                 sticky intro beside an accordion
    CtaBand             full-bleed gradient close
    Footer              link columns, signup, trust badges
```

Copy is centralised in `src/data/site.js`, so editing marketing text never means touching a
component. Each component owns a sibling `.css` file; there is no CSS framework.

The suite is Orders, HR Information System and CRM. The `products` array drives the navbar
mega menu, the hero chip selector, the showcase tabs and the footer links at once — adding
or removing one is a data edit, but each product also needs an illustration branch in
`ProductShowcase.jsx` keyed by its `id`, and the tab grid's column count updating.

## Conventions worth knowing

- **Style order matters.** `main.jsx` imports the three global stylesheets *before* `App`,
  so component media queries win over base rules. Reversing that order silently breaks the
  responsive navbar.
- **One transform per element.** Anything that both needs positioning and runs a
  `transform` animation is split into nested elements — see the hero's satellite chips
  (anchor → spinner → chip) and the orbit rings, which centre with `inset: 0; margin: auto`
  rather than a translate. Mixing a static transform with an animated one makes browsers
  interpolate mismatched transform lists, and the element drifts.
- **Accordions** animate with the `grid-template-rows: 0fr → 1fr` technique. The collapsing
  region must contain exactly one child with `overflow: hidden`, otherwise only its first
  row collapses.
- **Weights and shadows are tokenised.** Use `--fw-heading` / `--fw-medium` rather than
  numeric weights, and the `--sh-*` scale rather than literal shadows, so the flat look
  cannot drift back.
- **Motion is opt-out.** `@media (prefers-reduced-motion: reduce)` in `animations.css`
  neutralises every animation and shows all revealed content immediately.
- **Icons** come from the single sprite in `ui/Icon.jsx` and inherit `currentColor`. Inside
  a flex row they need `flex: none`, or they collapse to zero width.
- **Grid tracks use `minmax(0, 1fr)`, never bare `1fr`.** A bare `1fr` is
  `minmax(auto, 1fr)` and cannot shrink below its content's min-content width, which makes
  stacked sections overflow on narrow phones.

## Responsive behaviour

Breakpoints are per-component rather than global, roughly: 1080px (navbar collapses to the
drawer, hero stacks), 1000px (showcase and card grids go to two columns), 900px (spotlight
and FAQ stack), 620px (single column, secondary header actions hide).
