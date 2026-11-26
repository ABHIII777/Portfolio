# Abhi Patel — Portfolio

An editorial, recruiter-first portfolio built with Next.js 16, React 19,
Tailwind CSS 4, and Space Grotesk. Light and dark themes, folder-style project
case studies, a working contact draft, and a code-built footer scene.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

All copy, links, experience, projects, skills, and education live in
[`content/site.ts`](./content/site.ts). The downloadable resume is
[`public/resume.pdf`](./public/resume.pdf).

The portrait is a code-built monogram card in
[`components/ui/Portrait.tsx`](./components/ui/Portrait.tsx). Replace the
monogram block with an `<img>` when a real photo is ready.

## Structure

```text
app/
  layout.tsx            fonts, metadata, JSON-LD, ThemeProvider
  page.tsx              section composition
  about/page.tsx        long-form about page
  globals.css           tokens, type scale, folders, portrait, footer scene
components/
  sections/             Hero, Bio, Proof, Skills, Work, Experience, Contact, Footer
  ui/                   Nav, ThemeToggle, Portrait, FooterScene, Icons
content/site.ts
```

## Notes

- Theme tokens are CSS variables in `app/globals.css`; Tailwind v4 utilities
  read them through `@theme inline`.
- The theme toggle uses `data-theme`, injected by `next-themes` before paint.
- Project folders expand an inline case-study panel (no modal, no focus trap).
- Reduced-motion preferences disable the marquee and caret animations.
