import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { BEGINNER_B2_COURSE_ID, courseCards, formatCardNumber } from '../src/data/courseCards';
import { courseCardPath } from '../src/courses/coursePaths';
import { withCourseBrowser } from './browser';
import { assertPageQuality, waitForCourse } from './page-quality';

const mode = process.argv[2];
// Export the existing course explicitly; Node only needs metadata, not JSX/CSS modules.
const exportedCourse = { slug: BEGINNER_B2_COURSE_ID };
if (mode !== 'png' && mode !== 'pdf' && mode !== 'all') throw new Error('Usage: tsx scripts/export.ts png|pdf|all');

await withCourseBrowser(async (browser, baseURL) => {
  const context = await browser.newContext({ viewport: { width: 1000, height: 1300 }, deviceScaleFactor: 2, locale: 'ru-RU' });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await mkdir('exports', { recursive: true });
    if (mode === 'png' || mode === 'all') {
      await mkdir('exports/png', { recursive: true });
      for (const card of courseCards) {
        await page.goto(new URL(`${courseCardPath(exportedCourse, card.id)}?export=1`, baseURL).href);
        await waitForCourse(page);
        await assertPageQuality(page, 1);
        const filename = path.join('exports/png', `${formatCardNumber(card.id)}-${card.slug}.png`);
        await page.locator('[data-a4-page]').screenshot({ path: filename, animations: 'disabled', scale: 'device' });
        const png = await readFile(filename);
        const width = png.readUInt32BE(16);
        const height = png.readUInt32BE(20);
        if (width !== 1588 || height !== 2246) throw new Error(`${filename}: expected 1588 × 2246, got ${width} × ${height}`);
        console.log(`${filename} (${width} × ${height})`);
      }
    }
    if (mode === 'pdf' || mode === 'all') {
      await page.goto(new URL('/print', baseURL).href);
      await waitForCourse(page);
      await page.emulateMedia({ media: 'print' });
      await assertPageQuality(page, courseCards.length);
      const filename = 'exports/Visual-English-B2-Course.pdf';
      await page.pdf({ path: filename, format: 'A4', preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, margin: { top: 0, bottom: 0, left: 0, right: 0 }, tagged: true });
      console.log(filename);
    }
    if (errors.length) throw new Error(`Browser errors: ${errors.join('; ')}`);
  } finally {
    await context.close();
  }
});
