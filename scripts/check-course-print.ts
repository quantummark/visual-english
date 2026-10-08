import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { courseCards } from '../src/data/courseCards';
import { b2C1Cards } from '../src/courses/b2C1/cards';
import { courseCardPath, coursePath, coursePrintPath } from '../src/courses/coursePaths';
import { PROGRESS_STORAGE_KEY } from '../src/progress/progressStorage';
import { withCourseBrowser } from './browser';
import { assertPageQuality, waitForCourse } from './page-quality';

await withCourseBrowser(async (browser, baseURL) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  const open = (pathname: string) => page.goto(new URL(pathname, baseURL).href);
  const store = () => page.evaluate((key) => localStorage.getItem(key), PROGRESS_STORAGE_KEY);
  await mkdir('output/playwright', { recursive: true });
  await open('/');
  assert.deepEqual(await page.locator('.catalog-course__body > h3').allTextContents(), ['Beginner → B2', 'B2 → C1']);
  assert.equal(await page.locator('.catalog-course--soon, .course-soon').count(), 0);
  const advanced = page.locator('.catalog-course').filter({ has: page.getByRole('heading', { name: 'B2 → C1', exact: true }) });
  await advanced.getByRole('link', { name: 'Начать курс →', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/courses/b2-c1');
  assert.equal(await page.getByRole('link', { name: 'Начать курс →', exact: true }).getAttribute('href'), '/courses/b2-c1/cards/01');
  await page.evaluate((key) => localStorage.setItem(key, JSON.stringify({ version: 1, courses: {
    'beginner-b2': { completedCardIds: [1, 2], lastViewedCardId: 5, updatedAt: '2026-10-02T00:00:00.000Z' },
    'b2-c1': { completedCardIds: [1, 3, 8], lastViewedCardId: 12, updatedAt: '2026-10-06T00:00:00.000Z' },
  } })), PROGRESS_STORAGE_KEY);
  const before = await store();
  await open('/');
  assert.equal(await advanced.getByRole('link', { name: 'Продолжить →', exact: true }).count(), 1);
  await open('/courses/b2-c1');
  assert.equal(await page.getByRole('link', { name: 'Продолжить с карточки 12 →', exact: true }).getAttribute('href'), '/courses/b2-c1/cards/12');
  assert.equal(await store(), before, 'Publication must preserve existing course progress');

  for (const course of [{ slug: 'beginner-b2', cards: courseCards }, { slug: 'b2-c1', cards: b2C1Cards }]) {
    await open(coursePath(course));
    await page.getByRole('link', { name: 'Печать / PDF ↗', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, coursePrintPath(course));
    await waitForCourse(page);
    assert.equal(await page.locator('.print-stack').getAttribute('data-course-slug'), course.slug);
    assert.deepEqual(await page.locator('.print-stack h1').allTextContents(), course.cards.map((card) => card.title));
    assert.deepEqual(await page.locator('.print-card').evaluateAll((cards) => cards.map((card) => Number((card as HTMLElement).dataset.cardNumber))), course.cards.map((card) => card.id));
    assert.equal(await page.locator('.platform-header, .card-viewer, .viewer-toolbar, .viewer-filmstrip, .viewer-navigation, [role="progressbar"]').count(), 0);
    assert.equal(await page.getByRole('link', { name: '← К курсу', exact: true }).getAttribute('href'), coursePath(course));
    assert.equal(await page.title(), `Visual English Lab — ${course.slug === 'b2-c1' ? 'B2 to C1' : 'Beginner to B2'}`);
    await assertPageQuality(page, course.cards.length);
    // Exercise the keyboard print action while keeping the OS dialog out of automated QA.
    await page.evaluate(() => { window.print = () => document.documentElement.setAttribute('data-print-invoked', 'true'); });
    const print = page.getByRole('button', { name: 'Распечатать / сохранить PDF', exact: true });
    await print.focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.documentElement.dataset.printInvoked === 'true');
    assert.equal(await store(), before, 'Printing must not mutate progress');

    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ media: 'screen' });
      await assertPageQuality(page, course.cards.length);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Print preview should scroll inside its own container on mobile');
      assert.ok(await print.isVisible());
      await page.screenshot({ path: `output/playwright/print-${course.slug}-${width}.png` });
      await page.emulateMedia({ media: 'print' });
      assert.equal(await page.locator('.print-toolbar').isVisible(), false);
      await assertPageQuality(page, course.cards.length);
      assert.deepEqual(await page.locator('[data-a4-page]').evaluateAll((cards) => cards.map((card) => [(card as HTMLElement).clientWidth, (card as HTMLElement).clientHeight])), Array.from({ length: 14 }, () => [794, 1123]));
      assert.deepEqual(await page.locator('.print-card').evaluateAll((cards) => cards.map((card) => getComputedStyle(card).breakAfter)), [...Array(13).fill('page'), 'auto']);
      assert.equal(await page.locator('[data-a4-page]').first().evaluate((card) => getComputedStyle(card).printColorAdjust), 'exact');
    }

    // Compare every text box, font, color and relative position against the canonical export view.
    const printMetrics = await page.locator('[data-a4-page]').evaluateAll((cards) => cards.map((card) => {
      const origin = card.getBoundingClientRect();
      return Array.from(card.querySelectorAll<HTMLElement>('h1, h2, h3, p, strong, .course-footer')).map((text) => {
        const box = text.getBoundingClientRect();
        const style = getComputedStyle(text);
        return [text.textContent, ...[box.x - origin.x, box.y - origin.y, box.width, box.height].map((value) => Math.round(value * 100) / 100), style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight, style.color];
      });
    }));
    await page.emulateMedia({ media: 'screen' });
    for (const [index, card] of course.cards.entries()) {
      await open(`${courseCardPath(course, card.id)}?export=1`);
      await waitForCourse(page);
      const metrics = await page.locator('[data-a4-page]').evaluate((card) => {
        const origin = card.getBoundingClientRect();
        return Array.from(card.querySelectorAll<HTMLElement>('h1, h2, h3, p, strong, .course-footer')).map((text) => {
          const box = text.getBoundingClientRect();
          const style = getComputedStyle(text);
          return [text.textContent, ...[box.x - origin.x, box.y - origin.y, box.width, box.height].map((value) => Math.round(value * 100) / 100), style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight, style.color];
        });
      });
      assert.deepEqual(printMetrics[index], metrics, `${course.slug} Card ${card.id}: print changed approved typography/layout/colors`);
    }
    assert.equal(await store(), before, 'Export views must preserve progress');
  }
  await open('/print');
  await waitForCourse(page);
  assert.equal(await page.locator('.print-stack').getAttribute('data-course-slug'), 'beginner-b2');
  assert.deepEqual(await page.locator('.print-stack h1').allTextContents(), courseCards.map((card) => card.title));
  await open('/courses/missing/print');
  assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Курс не найден');
  assert.equal(await page.locator('.print-stack').count(), 0);
  assert.deepEqual(errors, []);
  await context.close();
  console.log('OK publication/print: two active courses, preserved progress, Start/Continue, canonical/legacy print routes, keyboard print, 14 atomic A4 cards, mobile isolation, identical typography/layout/colors for all 28 cards, no console errors');
});
