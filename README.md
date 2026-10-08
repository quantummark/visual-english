# Visual English Lab

Visual English Lab is a free visual English learning project designed to help learners understand how English works through clear visual explanations, structured courses, practical examples, and additional practice tools. Built with React, TypeScript, and Vite, it runs entirely in the browser without accounts or a backend.

Beginner → B2 and B2 → C1 are both available courses, each with 14 approved A4 learning cards and four stages. They share the viewer with zoom and Focus Mode, independent local progress tracking, and course-aware PNG/PDF export.

English Toolkit is a separate library with 12 Sentence Packs and 8 Think in English resources. Filters and individual pages are implemented, but the pages contain short samples and preliminary structures; full Toolkit content is still pending. Course progress is stored in this browser's localStorage. Toolkit does not track progress.

## Setup and local development

Requires Node.js 22.12+ (or 20.19+).

```bash
npm ci
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`). On Windows, use `npm.cmd` and `npx.cmd` if PowerShell blocks scripts.

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

Browser checks and exports also require Chromium:

```bash
npx playwright install chromium
```

## Pages

- `/` — course catalog and additional practice.
- `/courses/beginner-b2` — course overview, four stages, 14 cards, resume learning, and progress reset with confirmation.
- `/courses/beginner-b2/cards/01` … `/courses/beginner-b2/cards/14` — card viewer with zoom, Fit, Focus Mode, a filmstrip, and a mobile card picker.
- `/cards/01` … `/cards/14` — legacy URLs that redirect to current course routes while preserving query parameters.
- `/courses/b2-c1` — Advanced English overview with four stages, 14 approved cards, Start/Continue, progress, and whole-course printing.
- `/courses/b2-c1/cards/01` … `/courses/b2-c1/cards/14` — shared viewer with independent progress and explicit card completion.
- `/toolkit` — English Toolkit overview.
- `/toolkit/sentence-packs` — phrase packs with level and topic filters; `/:slug` opens an individual pack.
- `/toolkit/think-in-english` — visual articles with a category filter; `/:slug` opens an individual resource.
- `/courses/beginner-b2/print` and `/courses/b2-c1/print` — the selected course's 14 actual card components, each on a separate A4 page.
- `/print` — backward-compatible Beginner → B2 alias using the same print renderer.
- `/courses/beginner-b2/cards/01?export=1` — export view without zoom or toolbars.

Navigation uses regular links. Configure an SPA fallback to `index.html` in production so direct card links work. Vite dev and preview already support this.

## Project structure

```text
public/brand/logo/  Temporary header SVG, kept unchanged for later replacement
src/
  app/             App, routes, and navigation
  platform/        Course catalog and overview pages
  courses/         Types, course registry, stages, and card component references
  cards/           14 completed A4 card components
  viewer/          Card viewer, zoom, filmstrip, and mobile picker
  progress/        localStorage, explicit card completion, and course reset
  toolkit/         Resource registries, filters, and web page templates
  components/      A4Page, PagePreview, and reusable card building blocks
  data/            courseCards.ts: original Beginner → B2 card metadata
  styles/          Tokens, global styles, components, and print styles
  types/           CourseCard, CardId, and Accent
scripts/
  browser.ts       Local app and Chromium startup and cleanup
  export.ts        PNG and PDF export
  page-quality.ts  Page bounds and footer overlap checks
  check-pages.ts   Routes, links, mobile preview, and print checks
```

The temporary header logo is `public/brand/logo/visual-english-lab-header.svg`. Replace this asset when the final brand version is ready.

## PNG export

```bash
npm run export:png
```

The script starts Vite, opens each card, and captures only `[data-a4-page]`. Pages measure 210 × 297 mm in CSS; Chromium at deviceScaleFactor 2 produces **1588 × 2246 px** PNGs. Each file's dimensions are verified from its PNG header. Export fails if a card overflows.

Output: `exports/png/01-master-map.png` … `exports/png/14-practice-system.png`. Filenames come from card metadata; existing files with the same names are overwritten.

## PDF export

```bash
npm run export:pdf
npm run export:all
npm run export:pdf -- b2-c1
```

Default output remains `exports/Visual-English-B2-Course.pdf`. Passing `b2-c1` produces `exports/Visual-English-Lab-B2-C1.pdf`. Export reads registry-derived card metadata from `/courses/:slug/print`, preserving physical A4 pages, zero margins, backgrounds and colors, and excluding browser headers, toolbars and shadows. HTML text remains selectable and SVG diagrams remain vector graphics. `export:all` creates both formats in one browser session; all export modes accept an optional course slug. Advanced PNGs go to `exports/b2-c1/png/`.

Learners use **Печать / PDF** on the course overview or viewer, then **Распечатать / сохранить PDF** on the print page. Choose Save as PDF in the browser dialog. The web toolbar disappears in print; the document title identifies the selected course. No PDF-generation library or duplicated card content is used.

To use an already running app:

```powershell
$env:EXPORT_BASE_URL = 'http://localhost:5173'
npm run export:all
```

Optionally, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to a compatible Chromium executable. This is normally unnecessary after `npx playwright install chromium`.

## Design system

`tokens.css` defines colors, contrasting text colors for each accent, spacing, radii, shadows, font sizes, and the system sans-serif stack. The project uses no external fonts, Tailwind, canvas, or UI frameworks.

Card accents: 01–03 blue; 04–05 orange; 06–07 green; 08 teal; 09–12 purple; 13–14 cyan. Red indicates errors and yellow highlights hints. `data-accent` sets the local accent and light background. Text uses the darker `--accent-ink` for readability.

`A4Page` always measures 210 × 297 mm with 15 mm margins. `PagePreview` uses ResizeObserver to scale the entire page to the available width and height. The internal layout stays fixed; mobile media queries do not change a card's composition. Card headers and footers are consistent, with footers anchored by the shared flex layout. Overflow is deliberately visible so checks can detect it.

`.page-grid` has 12 columns. Blocks span the full width by default; `span-4`, `span-6`, `span-8`, and `span-12` control their width. `.two-column` creates two equal columns. Use tokens for A4 font sizes rather than viewport units.

Components are exported from `src/components/index.ts`:

| Component | Main props / purpose |
| --- | --- |
| A4Page | `cardId`, `accent`, `children` |
| CourseHeader | `card`, optional `secondaryLabel` |
| CourseFooter | `card`, navigation from metadata |
| Section | `title`, optional `label`, `className`, `children` |
| MainIdeaBox | `children`, optional `label`, `accent` |
| ExampleCard | `english`, `explanation`, optional `accent` |
| ComparisonBlock | `left`, `right`, optional labels |
| MistakeBox | `wrong`, `correct`, optional `explanation` |
| PracticeBox | `question`, optional `options`, `children`, static `answer` |
| StepFlow | `steps`: an array of HTML/React blocks |
| DecisionTree | `question`, `branches: { id, label, content }[]` |
| Timeline | `points: { id, label, note? }[]`, optional `activeId` |
| FlowArrow | `direction: right / down`, SVG |
| StageBadge | `stage`, optional `label` |
| Label | `children`, `tone: neutral / accent / hint` |
| IconBadge | `label`, SVG in `children`, optional `accent` |

FlowArrow, StepFlow, and Timeline use SVG without rasterizing text. DecisionTree uses HTML and CSS for simple branches. Design longer diagrams to fit A4 width; fonts do not shrink automatically. Pass SVG icons without redundant accessible names, since IconBadge already supplies the label.

## Editing a card

1. Open its component, for example `src/cards/Card01MasterMap.tsx`.
2. Edit the composition while preserving its shell:

```tsx
import { A4Page, CourseHeader, CourseFooter, Section } from '../components';
import { getCourseCard } from '../data/courseCards';

export function Card01MasterMap() {
  const card = getCourseCard(1)!;
  return (
    <A4Page cardId={card.id} accent={card.accent}>
      <CourseHeader card={card} />
      <div className="page-content page-grid">
        <Section title="Section title">Learning content</Section>
      </div>
      <CourseFooter card={card} />
    </A4Page>
  );
}
```

3. Keep titles, numbers, accents, and slugs in `courseCards.ts`; do not duplicate them in components.
4. Reuse existing blocks and shared CSS. For a unique diagram, add a local CSS Module rather than changing the shared layout for one card.
5. Run `npm run check:pages` and `npm run export:all`. Do not reduce text or crop pages to hide overflow.

Beginner → B2 has 14 pages. Register new courses separately in `src/courses/courseRegistry.ts`; the viewer reads cards and progress from the current course. Toolkit uses its own registries and web pages and is excluded from course exports.

B2 → C1 metadata and its 14 approved card implementations live in `src/courses/b2C1/`. Its status is `available`; the home catalog keeps Beginner → B2 first and B2 → C1 second. Both courses use the same registry, Start/Continue/completed-course logic, viewer and `CoursePrint` renderer. Existing `b2-c1` local progress is preserved without migration. Opening a card does not mark it studied; completion remains explicit.

## Browser validation

```bash
npm run check:pages
npm run check:print
npm run check:viewer
npm run check:progress
npm run check:platform
npm run check:b2-c1
npm run check:toolkit
```

Checks cover routes, header titles, previous/next links, A4 aspect ratio, overflow, the gallery, back navigation, mobile fitting without changes to internal dimensions, and print CSS. Screenshots are saved to `output/playwright/`. After adding learning content, also review PNG and PDF exports visually; bounds checks do not replace an editorial layout review.

`check:print` checks both published courses, course-aware print actions, keyboard printing, old `/print` compatibility, progress preservation, mobile print dimensions, atomic page breaks, and equality of every text box's position, font and color against all 28 canonical cards. PDF page counts and rendered output should also be checked after modifying print styles.

`node_modules`, `dist`, `exports`, `output`, `tmp`, `.playwright-cli`, and local `.env` files are excluded from Git. Source files and `package-lock.json` are tracked; exports are generated locally with the commands above.
