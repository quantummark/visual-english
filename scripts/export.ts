import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { BEGINNER_B2_COURSE_ID, formatCardNumber } from '../src/data/courseCards';
import { courseCardPath, coursePrintPath } from '../src/courses/coursePaths';
import { withCourseBrowser } from './browser';
import { assertPageQuality, waitForCourse } from './page-quality';

const mode = process.argv[2];
const exportedCourse = { slug: process.argv[3] ?? BEGINNER_B2_COURSE_ID };
if ((mode !== 'png' && mode !== 'pdf' && mode !== 'all') || !/^[a-z0-9-]+$/.test(exportedCourse.slug)) throw new Error('Usage: tsx scripts/export.ts png|pdf|all [course-slug]');

await withCourseBrowser(async (browser, baseURL) => {
  const context = await browser.newContext({ viewport: { width: 1000, height: 1300 }, deviceScaleFactor: 2, locale: 'ru-RU' });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await mkdir('exports', { recursive: true });
    await page.goto(new URL(coursePrintPath(exportedCourse), baseURL).href);
    await page.locator('.print-stack').waitFor();
    await waitForCourse(page);
    // Read registry-derived metadata from the app, without importing JSX/CSS in Node.
    const cards = await page.locator('.print-card').evaluateAll((elements) => elements.map((element) => ({
      number: Number((element as HTMLElement).dataset.cardNumber),
      slug: (element as HTMLElement).dataset.cardSlug!,
    })));
    if (!cards.length) throw new Error(`No printable cards in ${exportedCourse.slug}`);
    await assertPageQuality(page, cards.length);
    if (mode === 'png' || mode === 'all') {
      const directory = exportedCourse.slug === BEGINNER_B2_COURSE_ID ? 'exports/png' : path.join('exports', exportedCourse.slug, 'png');
      await mkdir(directory, { recursive: true });
      for (const card of cards) {
        await page.goto(new URL(`${courseCardPath(exportedCourse, card.number)}?export=1`, baseURL).href);
        await waitForCourse(page);
        await assertPageQuality(page, 1);
        const filename = path.join(directory, `${formatCardNumber(card.number)}-${card.slug}.png`);
        await page.locator('[data-a4-page]').screenshot({ path: filename, animations: 'disabled', scale: 'device' });
        const png = await readFile(filename);
        const width = png.readUInt32BE(16);
        const height = png.readUInt32BE(20);
        if (width !== 1588 || height !== 2246) throw new Error(`${filename}: expected 1588 × 2246, got ${width} × ${height}`);
        console.log(`${filename} (${width} × ${height})`);
      }
    }
    if (mode === 'pdf' || mode === 'all') {
      await page.goto(new URL(coursePrintPath(exportedCourse), baseURL).href);
      await waitForCourse(page);
      await page.emulateMedia({ media: 'print' });
      await assertPageQuality(page, cards.length);
      const filename = exportedCourse.slug === BEGINNER_B2_COURSE_ID ? 'exports/Visual-English-B2-Course.pdf' : `exports/Visual-English-Lab-${exportedCourse.slug.toUpperCase()}.pdf`;
      await page.pdf({ path: filename, format: 'A4', preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, margin: { top: 0, bottom: 0, left: 0, right: 0 }, tagged: true });
      console.log(filename);
    }
    if (errors.length) throw new Error(`Browser errors: ${errors.join('; ')}`);
  } finally {
    await context.close();
  }
});
