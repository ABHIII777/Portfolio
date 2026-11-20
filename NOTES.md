# Portfolio — Build Notes

Working notes for a spatial, recruiter-first portfolio. Reference material, decision log, and the phased plan through deployment.

Reference site studied: `https://www.aswinpanengal.me/` — structure borrowed, visual identity not.

---

## 1. Concept

**"The Room."** A low-poly isometric studio, built entirely from code primitives, that acts as the hero, the navigation, and the theme switch.

The differentiator: **the toggle isn't a colour swap, it's a time of day.** Light mode is daylight through a window — cool, clean, shadowed. Dark mode is the same room at night with the desk lamp on — warm pools of light, glowing monitor. Same geometry, two completely different moods.

The room is never the only path. A conventional nav and conventional DOM content carry the site; the room is a bonus route for people who want to play.

### Audience

Recruiters and hiring managers for full-time roles. Every decision resolves toward: *can someone confirm in 10 seconds that I'm worth a call?*

### What we deliberately do NOT copy

- Code-rain canvas texture
- Skeuomorphic manila project folders
- Per-letter wave hover on links
- Illustrated street-scene footer
- Full-screen letter-stagger navigation

Retained only at the structural level: oversized display type, film grain, deep project case studies, one personal flourish at the end.

---

## 2. Section order (recruiter-optimised)

| # | Section                                                       | Job it does                               |
| - | ------------------------------------------------------------- | ----------------------------------------- |
| 0 | Fixed header + **Resume PDF** button                    | First thing a recruiter hunts for         |
| 1 | Hero — name, target role, one-sentence pitch, the Room       | Who / what in three seconds               |
| 2 | Proof strip — 3 metrics or company logos                     | Instant credibility, scannable            |
| 3 | Experience — vertical timeline, newest first                 | Recruiters read this before anything else |
| 4 | Selected Work — 3 projects, each a full case-study overlay   | Depth without leaving the page            |
| 5 | Skills — grouped chips, no proficiency bars                  | Bars are unverifiable and dated           |
| 6 | Education + certifications — compact                         | Present, not hogging attention            |
| 7 | Contact — email, LinkedIn, GitHub, resume, location/timezone | Remove every friction point               |
| 8 | Footer — the personal flourish                               | Personality, after business is done       |

Separate route: **`/about`** — the longer story, photo, how I work, and the flourish the homepage footer can't carry.

### Room objects → sections

| Object                 | Maps to                                                  |
| ---------------------- | -------------------------------------------------------- |
| Monitor on desk        | **Selected Work** — screens cycle project posters |
| Corkboard on wall      | **Experience** — pinned index cards = roles       |
| Bookshelf              | **Skills** — spines coloured by category          |
| Desk lamp              | **About** — also drives the night lighting state  |
| Armchair / plant / rug | Ambient personality                                      |
| Framed print or door   | **Contact**                                        |

Hover lifts the object and reveals a small label (`<Html>` from drei, or a DOM tooltip positioned off the pointer — DOM is safer). Click scrolls to the section.

### Scroll choreography

- Hero: room fills viewport, orthographic isometric camera, gentle idle motion only.
- Scrolling: room **docks to a small live vignette in the bottom corner**, acting as an ambient progress marker; the active object is subtly emphasised.
- At Contact: fades out entirely.
- Camera never flies. Orthographic, locked angle, no motion sickness.

---

## 3. Stack, pinned

```
next@16.4.6
react@19.3.1        react-dom@19.3.1
tailwindcss@4.3.5
motion@14.14.0          (successor to framer-motion; same API, import from "motion/react")
three@0.187.0
@react-three/fiber@9.8.2
@react-three/drei@10.7.9
@types/three@0.187.0
next-themes@0.4.6
lucide-react@1.77.0
clsx@2.1.1  tailwind-merge@3.7.1
```

`framer-motion@14` still publishes but `motion` is the current package name. Import hooks from `motion/react`.

### Scaffold

```bash
npx create-next-app@latest . --ts --tailwind --app --import-alias "@/*" --turbopack
npm i three @react-three/fiber @react-three/drei motion next-themes lucide-react clsx tailwind-merge
npm i -D @types/three
```

`@types/three` must share the minor version of `three` or phantom type errors appear.

---

## 4. Design system

| Token                | Dark        | Light       |
| -------------------- | ----------- | ----------- |
| `--color-canvas`   | `#0B0C0E` | `#F4F1EA` |
| `--color-ink`      | `#EDEAE4` | `#141414` |
| `--color-ink-soft` | `#9A9BA1` | `#5B5A57` |
| `--color-line`     | `#26282C` | `#DEDDD8` |
| `--color-surface`  | `#131519` | `#EAE7DF` |
| `--color-accent`   | `#C6F24E` | same        |

Accent is used **only** on interactive states. Never on decorative fills.

Type: black-weight display face for statements (Inter Tight / Archivo / Bricolage Grotesque via `next/font`), clean grotesque for body. Grain overlay sitewide. Consistent implied light direction; slight perspective on cards; parallax layers. The page should feel like the same space the Room lives in.

---

## 5. Reference code — the hard parts

### 5a. True isometric camera

There is no "isometric" flag. It's orthographic projection plus a specific angle. `[10, 10, 10]` looking at origin gives the classic 2:1 isometric (35.264° above horizon, 45° rotated).

```tsx
<Canvas orthographic camera={{ position: [10, 10, 10], zoom: 55, near: -100, far: 1000 }}>
```

- `zoom` is **pixels per world unit** — that's the size knob, not `position`.
- Use a **negative `near`** or the back walls clip when the camera sits outside the geometry.
- No `OrbitControls` in production. Debug-only behind a flag, then delete.

### 5b. Canvas setup — lazy, poster-first, demand-driven

```tsx
// components/scene/RoomClient.tsx   ← must be a client component
const Room = dynamic(() => import("./Room"), { ssr: false, loading: () => null });

<div className="relative aspect-square">
  {/* poster always present: no layout shift, instant paint */}
  <img src="/room-poster.png" alt="" className="absolute inset-0 h-full w-full" />
  {enabled && <Room mode={mode} onReady={() => setPosterFaded(true)} />}
</div>
```

One place decides whether WebGL runs:

```ts
const enabled =
  !useReducedMotion() &&
  window.matchMedia("(min-width: 768px)").matches &&
  !window.matchMedia("(prefers-reduced-data: reduce)").matches;
```

On the canvas: `frameloop="demand"`. It sits completely still until `invalidate()` is called. This single prop separates a quiet laptop from a spinning fan. Invalidate on pointer move / idle animation only while interacting, then stop.

### 5c. Day/night lighting rig

Three lights: sun through the window, ambient fill, lamp point-light.

```ts
const DAY   = { sun: 2.2,  sunColor: "#FFF6E8", ambient: 0.55, lamp: 0, bg: "#F4F1EA" };
const NIGHT = { sun: 0.05, sunColor: "#1B2438", ambient: 0.18, lamp: 9, bg: "#0B0C0E" };
```

Do **not** `set` these in `useEffect`. Damp them in `useFrame`:

```ts
sun.intensity = THREE.MathUtils.damp(sun.intensity, target.sun, 4, delta);
```

`damp` handles varying delta time; `lerp` does not.

### 5d. Scroll docking

```tsx
const { scrollYProgress } = useScroll();
const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.22]);
const x     = useTransform(scrollYProgress, [0, 0.12], [0, 180]);
const y     = useTransform(scrollYProgress, [0, 0.12], [0, 220]);
```

Rules:

- Wrapper is `position: fixed` and **`pointer-events-none`** once docked, or it eats content clicks.
- Under reduced motion, freeze at start values — don't skip positioning.

### 5e. Theme toggle without a flash

```tsx
<ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
```

`next-themes` injects its own blocking script, so no FOUC and no manual `localStorage` hack.

**Trap:** React context does not reliably reach components inside `<Canvas>` (separate reconciler). Don't call `useTheme()` in a 3D component — read it in the DOM tree and pass it down:

```tsx
<Room mode={theme === "dark" ? "night" : "day"} />
```

### 5f. Grain overlay — no image file

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 150;
  pointer-events: none;
  opacity: 0.28;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

~300 bytes, resolution-independent, beats a 256px PNG.

### 5g. Tailwind v4 tokens

No `tailwind.config.js` in v4 — everything lives in CSS.

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  --color-canvas: #0B0C0E;
  --color-ink: #EDEAE4;
  --color-line: #26282C;
  --color-accent: #C6F24E;
  --font-display: var(--font-display), sans-serif;
}
```

Then `bg-canvas text-ink border-line` works, and `dark:` keys off `data-theme` rather than the default `.dark` class. Set this up on day one; retrofitting token names across 40 components is miserable.

### 5h. Content model

```ts
// content/site.ts
export const site = {
  name: "—",
  role: "—",
  pitch: "—",
  links: { email: "", linkedin: "", github: "", resume: "/resume.pdf" },
  proof: [{ value: "—", label: "—" }],
} as const;

export type Job = {
  role: string; company: string; start: string; end: string; blurb: string;
};

export type Project = {
  slug: string; name: string; tagline: string; stack: string[];
  poster: string; live?: string; source?: string;
  problem: string; approach: string[]; outcome: string;
};
```

No CMS. A personal site doesn't earn the maintenance tax.

### 5i. next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { optimizePackageImports: ["lucide-react", "@react-three/drei"] },
  async headers() {
    return [{
      source: "/(room-poster.png|resume.pdf|og.png)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
};

export default nextConfig;
```

`_next/static` is already immutable-hashed by Next — don't touch it.

---

## 6. File tree

```
app/
  layout.tsx              fonts (next/font), metadata, JSON-LD Person, ThemeProvider
  page.tsx                section composition
  about/page.tsx
  globals.css             tokens, grain, type scale
  opengraph-image.tsx     ImageResponse from next/og
components/
  scene/RoomClient.tsx    dynamic import + poster + capability gate
  scene/Room.tsx          <Canvas orthographic frameloop="demand">
  scene/Rig.tsx           day/night lighting lerp
  scene/objects/          Desk, Monitor, Corkboard, Shelf, Lamp, Plant, Rug…
  sections/               Hero, Proof, Experience, Work, Skills, Education, Contact, Footer
  ui/                     Nav, ThemeToggle, Grain, ProjectOverlay, CTA, TextLink
content/site.ts
public/
  resume.pdf  room-poster.png  og.png  posters/
```

---

## 7. Asset sources

- **Fonts:** Fontshare (free commercial — General Sans, Switzer, Clash Display) or Google via `next/font/google` (Inter Tight, Archivo, Bricolage Grotesque). `next/font` = no layout shift, no third-party request.
- **OG image:** `app/opengraph-image.tsx` + `ImageResponse` from `next/og`. Generated at build, no Photoshop.
- **Poster render:** screenshot the running canvas once at the final camera angle, commit as `/public/room-poster.png`. It's the fallback **and** the OG image.

---

## 8. Traps, ranked by time cost

1. **Context doesn't cross into `<Canvas>`.** Pass props. (5e)
2. **`frameloop="always"`** on an idle hero. Use `demand`. (5b)
3. **`dynamic(..., { ssr: false })` must live in a client component** — Next forbids it in Server Components.
4. **Negative `near`** on the ortho camera, or back walls vanish. (5a)
5. **`pointer-events`** on the docked canvas swallowing content clicks. (5d)
6. **`@types/three` version drift** → hundreds of phantom type errors.
7. **The poster is not optional.** Ship it in phase one, before the canvas exists.

---

## 9. Implementation plan

Rough sequence. Each phase ends in a deployable state — never a broken middle.

### Phase 0 — Repo & deploy skeleton

**Goal:** a live URL before any real code.

- [X] `git init`, GitHub repo, push
- [X] Scaffold with `create-next-app` (section 3)
- [X] Install `@vercel/analytics` + `@vercel/speed-insights` (optional but free)
- [X] Connect repo to Vercel — every push becomes a preview deploy
- [X] `npx vercel link` locally for CLI previews/prod
- [X] Confirm Node ≥ 20.9 in Vercel project settings (Next 16 requirement)
- [ ] Delete boilerplate, commit, confirm the preview URL loads

**Done when:** `main` auto-deploys and a PR produces a preview URL.

---

### Phase 1 — Design system & shell

**Goal:** the visual language exists and is locked.

- [ ] `globals.css`: Tailwind v4 `@import`, `@theme` tokens, `@custom-variant dark`, grain, type scale, `:focus-visible` ring
- [ ] `next/font` display + body faces, wired to `--font-display`
- [ ] `ThemeProvider` with `attribute="data-theme"`, no-flash verified by hard-reloading in both themes
- [ ] `ThemeToggle` (lucide icons, `aria-pressed`, keyboard accessible)
- [ ] `Nav` — wordmark, links, Resume button, mobile sheet
- [ ] `app/layout.tsx` — metadata, viewport, `theme-color` for both schemes
- [ ] `lib/cn.ts` — clsx + tailwind-merge
- [ ] Empty section components wired into `page.tsx` with correct IDs/anchors

**Done when:** you can tab through the page in both themes, the toggle survives reload with no flash, and anchors work.

---

### Phase 2 — Static content pass

**Goal:** a good portfolio with zero 3D. This is the bulk of perceived quality.

- [ ] `content/site.ts` populated with typed placeholders
- [ ] Hero typography — display scale via `clamp()`, pitch line, CTA pair
- [ ] Proof strip — 3 items, responsive
- [ ] Experience timeline — year gutter, semantic `<ol>`
- [ ] Selected Work — 3 cards, poster, tagline, stack chips, hover affordance
- [ ] Skills — grouped chip blocks
- [ ] Education + certs
- [ ] Contact block + working `mailto:` composition
- [ ] Footer + flourish slot
- [ ] `/about` route with long-form layout
- [ ] Responsive sweep at 360 / 768 / 1024 / 1440
- [ ] Reserve the hero's 3D slot with a solid placeholder box **at final aspect ratio**

**Done when:** it looks finished with no WebGL, and screenshots at all four widths are clean.

---

### Phase 3 — The Room

**Goal:** the differentiator, added to a site that already works.

- [ ] `Room.tsx` — orthographic canvas, isometric camera, `frameloop="demand"`
- [ ] `RoomClient.tsx` — dynamic import, capability gate, poster crossfade
- [ ] Render `room-poster.png` from the final camera angle, commit it
- [ ] Geometry pass — desk, monitor, corkboard, shelf, lamp, chair, plant, rug, floor/walls
- [ ] Flat materials + soft bevels (`RoundedBox` from drei), limited palette
- [ ] `Rig.tsx` — sun / ambient / lamp, `MathUtils.damp` transitions on `mode` prop
- [ ] Object hover lift + label; click → `scrollIntoView`
- [ ] Scroll docking — `useScroll` + `useTransform`, `pointer-events-none` when docked
- [ ] Reduced-motion path returns the static poster
- [ ] Mobile returns the static poster
- [ ] Bundle check: 3D chunk lazy-loaded, gzipped < 180 KB

**Done when:** the fan doesn't spin up when idle, the poster is indistinguishable from the live canvas on a phone, and clicking the monitor lands you on Selected Work.

---

### Phase 4 — Case studies & /about depth

**Goal:** the depth that separates a portfolio from a list of links.

- [ ] `ProjectOverlay` — route-less modal or intercepting route, focus trap, `Esc` to close, restores focus
- [ ] Case-study layout: Role / Ownership / Stack / Hosting facts, then Problem → Approach → Outcome
- [ ] Stack chips, live + source links
- [ ] `/about`: photo, narrative, how-I-work, the flourish
- [ ] Footer flourish implemented
- [ ] Page transitions (respecting reduced motion)

**Done when:** every project is understandable without visiting the live app, and the overlay is fully keyboard operable.

---

### Phase 5 — Polish, a11y, performance

**Goal:** nothing embarrassing left.

- [ ] Keyboard sweep — tab order, visible focus everywhere, skip link
- [ ] Screen-reader pass — landmarks, headings hierarchy, `alt` text, decorative `aria-hidden`
- [ ] Contrast check both themes — WCAG AA on body copy
- [ ] `prefers-reduced-motion` audit across every animation
- [ ] Lighthouse: Performance ≥ 90 mobile, Accessibility 100, Best Practices 100, SEO 100
- [ ] Font subsetting verified (`next/font` does this — confirm no unused weights)
- [ ] `next build` clean: no warnings, no hydration mismatches
- [ ] 404 page, favicon set, `robots.txt`, `sitemap.ts`
- [ ] JSON-LD `Person` + `WebSite` validated in Rich Results Test
- [ ] OG image renders correctly in a social preview debugger

**Done when:** Lighthouse targets hit on a throttled mobile profile, not just on your machine.

---

### Phase 6 — Deploy & launch

**Goal:** public, indexed, monitored.

- [ ] Merge to `main`, confirm production deploy
- [ ] Add custom domain in Vercel → Domains; point DNS (A/CNAME or nameservers)
- [ ] Verify HTTPS certificate issued and `www` → apex redirect (or vice versa) is intentional
- [ ] Set the canonical domain in `metadataBase`
- [ ] Submit sitemap to Google Search Console, verify ownership
- [ ] Vercel Analytics + Speed Insights confirmed receiving events
- [ ] Rollback drill: `vercel ls`, promote the previous deployment — know the command *before* you need it
- [ ] Post-launch: check real-device mobile, one old Android, one iPhone
- [ ] Optional: preview-protection off for the production alias so recruiters' link-preview bots work

**Done when:** the domain resolves over HTTPS, the sitemap is submitted, and you've tested the rollback path.

---

### Vercel specifics worth knowing

```bash
vercel                 # preview deploy of current working tree
vercel --prod          # production
vercel ls              # deployments
vercel promote <url>   # roll forward/back to an existing build
```

- Framework preset auto-detects Next. Don't hand-write build commands.
- `NEXT_PUBLIC_*` vars are inlined at **build** time — changing one requires a redeploy.
- Preview deployments are `noindex` by default; production isn't. Check `robots` before launch.
- Function regions rarely matter for a static portfolio, but set them near your audience if you add an API route.
- No `vercel.json` needed unless you're adding custom headers/redirects — prefer `next.config.ts`.

---

## 10. Content checklist (fill in whenever)

- [ ] Name, target role title, one-sentence pitch
- [ ] Resume PDF → `/public/resume.pdf`
- [ ] 3 projects: name, tagline, stack, what I did, outcome, live URL, source URL
- [ ] Experience entries: role, company, dates, one-line blurb
- [ ] Skills grouped into 3–4 categories
- [ ] Education + certifications
- [ ] LinkedIn / GitHub / email (the email you actually want public)
- [ ] Photo for `/about`
- [ ] Location + timezone + work authorisation line (recruiters filter on this)
- [ ] The personal flourish — the one weird thing at the end

---

## 11. Open decisions

- Display typeface: Inter Tight vs. Archivo vs. Bricolage Grotesque — decide in Phase 1 against real copy, not lorem.
- Accent colour: currently lime `#C6F24E`; revisit once the room's lighting is rendered.
- `/about` flourish format: unknown — decided in Phase 4.
- Whether the room appears on `/about` at all, or the sub-page stays purely typographic.
