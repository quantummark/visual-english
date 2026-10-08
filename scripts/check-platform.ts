import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { withCourseBrowser } from './browser';
import { PROGRESS_STORAGE_KEY } from '../src/progress/progressStorage';
import { BEGINNER_B2_COURSE_ID, courseCardIds } from '../src/data/courseCards';

await withCourseBrowser(async (browser, baseURL) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const overview = `/courses/${BEGINNER_B2_COURSE_ID}`;
  const catalogCourse = page.locator('.catalog-course').filter({ has: page.getByRole('heading', { name: 'Beginner → B2', exact: true }) });
  const cardPath = (number: number) => `${overview}/cards/${String(number).padStart(2, '0')}`;
  const open = (path: string) => page.goto(new URL(path, baseURL).href);
  const store = () => page.evaluate((key) => localStorage.getItem(key), PROGRESS_STORAGE_KEY);
  const seed = (completed: readonly number[], last: number | null) => page.evaluate(({ key, courseId, completed, last }) => {
    localStorage.setItem(key, JSON.stringify({ version: 1, courses: { [courseId]: { completedCardIds: completed, lastViewedCardId: last, updatedAt: '2026-10-02T00:00:00.000Z' } } }));
  }, { key: PROGRESS_STORAGE_KEY, courseId: BEGINNER_B2_COURSE_ID, completed, last });
  await mkdir('output/playwright', { recursive: true });
  await open('/');
  assert.equal(await page.title(), 'Visual English Lab');
  assert.equal(await page.locator('.catalog-course').count(), 2);
  assert.equal(await page.locator('.catalog-course--soon').count(), 0);
  assert.equal(await store(), null, 'Catalog must not create progress');
  await catalogCourse.getByRole('link', { name: 'Начать курс →', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, overview);
  await page.locator('.course-stage').first().waitFor();
  assert.equal(await page.locator('.course-stage').count(), 4);
  assert.equal(await page.locator('.lesson-tile').count(), courseCardIds.length);
  assert.deepEqual(await page.locator('.course-stage').evaluateAll((stages) => stages.map((stage) => stage.querySelectorAll('.lesson-tile').length)), [3, 7, 2, 2]);
  assert.equal(await store(), null, 'Overview must not create a last-viewed card');
  await page.getByRole('link', { name: 'Начать курс →', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, cardPath(1));
  assert.equal(await page.getByRole('link', { name: 'К курсу', exact: true }).getAttribute('href'), overview);
  await page.getByRole('link', { name: 'К курсу', exact: true }).click();
  await seed([1, 2, 3], 6);
  const oldProgress = await store();
  await open('/');
  assert.equal(await catalogCourse.getByRole('progressbar').getAttribute('aria-valuenow'), '3');
  assert.equal(await page.getByRole('button', { name: 'Сбросить прогресс' }).count(), 0);
  assert.equal(await store(), oldProgress, '2A storage must survive the new home');
  await open(overview);
  assert.equal(await page.locator('.course-overview__progress [role="progressbar"]').getAttribute('aria-valuenow'), '3');
  assert.equal(await page.getByRole('link', { name: 'Продолжить с карточки 06 →', exact: true }).getAttribute('href'), cardPath(6));
  assert.equal(await page.locator('.lesson-studied').count(), 3);
  assert.equal(await page.locator('.lesson-tile[data-last-viewed="true"]').count(), 1);
  assert.equal(await store(), oldProgress, '2A storage must survive the overview');
  await page.getByRole('link', { name: 'Продолжить с карточки 06 →', exact: true }).click();
  await page.getByRole('button', { name: 'Отметить карточку как изученную', exact: true }).click();
  await open(overview);
  assert.deepEqual(await page.locator('.course-stage__header [role="progressbar"]').evaluateAll((bars) => bars.map((bar) => bar.getAttribute('aria-valuenow'))), ['3', '1', '0', '0']);
  await page.getByRole('button', { name: 'Сбросить прогресс', exact: true }).click();
  await page.getByRole('button', { name: 'Отмена', exact: true }).click();
  assert.equal(await page.locator('.lesson-studied').count(), 4);
  await page.getByRole('button', { name: 'Сбросить прогресс', exact: true }).click();
  await page.getByRole('button', { name: 'Сбросить', exact: true }).click();
  assert.equal(await page.locator('.lesson-studied').count(), 0);
  assert.equal(await page.getByRole('link', { name: 'Начать курс →', exact: true }).getAttribute('href'), cardPath(1));
  await seed(courseCardIds, 14); await open('/');
  assert.equal(await catalogCourse.getByRole('progressbar').getAttribute('aria-valuenow'), String(courseCardIds.length));
  await open(overview);
  assert.equal(await page.locator('.lesson-studied').count(), courseCardIds.length);
  assert.equal(await page.getByRole('link', { name: 'Повторить курс →', exact: true }).getAttribute('href'), cardPath(1));
  for (const id of [1, 14]) {
    await open(overview); await open(`/cards/${String(id).padStart(2, '0')}`);
    await page.waitForURL(new URL(cardPath(id), baseURL).href);
    await page.reload(); assert.equal(new URL(page.url()).pathname, cardPath(id));
    await page.goBack(); assert.equal(new URL(page.url()).pathname, overview, 'Legacy redirect must replace history');
  }
  await open('/cards/01?export=1');
  await page.waitForURL(new URL(`${cardPath(1)}?export=1`, baseURL).href);
  assert.equal(await page.locator('.card-viewer').count(), 0);
  assert.equal(await page.locator('[data-a4-page]').count(), 1);
  await open('/courses/b2-c1');
  assert.equal(await page.getByRole('heading', { name: 'B2 → C1', exact: true }).count(), 1);
  assert.equal(await page.locator('.course-stage').count(), 4);
  assert.equal(await page.locator('.lesson-tile').count(), 14);
  assert.equal(await page.locator('.course-overview__progress [role="progressbar"]').getAttribute('aria-valuenow'), '0');
  assert.equal(await page.getByRole('link', { name: 'Начать курс →', exact: true }).getAttribute('href'), '/courses/b2-c1/cards/01');
  assert.equal(await page.evaluate((key) => Object.hasOwn(JSON.parse(localStorage.getItem(key) ?? '{}').courses ?? {}, 'b2-c1'), PROGRESS_STORAGE_KEY), false);
  for (const [path, title] of [['/courses/unknown', 'Курс не найден'], [cardPath(99), 'Карточка не найдена']]) {
    await open(path); assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), title);
  }
  await seed([1, 2, 3], 6);
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 1440, height: 900 }, { width: 820, height: 1180 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const [path, name] of [['/', 'home'], [overview, 'course'], [cardPath(7), 'viewer'], ['/courses/b2-c1', 'advanced']]) {
      await open(path);
      await page.evaluate(async () => { await document.fonts.ready; });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name} overflows at ${viewport.width}`);
      await page.screenshot({ path: `output/playwright/platform-${name}-${viewport.width}.png`, fullPage: true });
      if (name === 'course' && viewport.width === 390) {
        assert.equal(await page.locator('.lesson-tile').first().evaluate((tile) => getComputedStyle(tile).display), 'flex');
        await page.locator('.course-stage').first().scrollIntoViewIfNeeded();
        await page.screenshot({ path: 'output/playwright/platform-course-mobile-lessons.png' });
      }
    }
  }
  await open('/print'); assert.equal(await page.locator('[data-a4-page]').count(), courseCardIds.length); assert.equal(await page.locator('.platform-header, .course-stage, .card-completion, [role="progressbar"]').count(), 0);
  assert.deepEqual(errors, []);
  await context.close();
  console.log('OK platform: two available courses, four stages, canonical/legacy routes, refresh/history, 2A progress compatibility, continue/review/reset, responsive pages, export isolation');
});
