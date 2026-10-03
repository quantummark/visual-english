import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { BEGINNER_B2_COURSE_ID, courseCardIds, totalCards } from '../src/data/courseCards';
import { PROGRESS_STORAGE_KEY } from '../src/progress/progressStorage';
import { withCourseBrowser } from './browser';

await withCourseBrowser(async (browser, baseURL) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const open = (path: string) => page.goto(new URL(path, baseURL).href);
  const stored = () => page.evaluate(({ key, courseId }) => JSON.parse(localStorage.getItem(key) ?? '{}').courses?.[courseId], { key: PROGRESS_STORAGE_KEY, courseId: BEGINNER_B2_COURSE_ID });
  const completed = () => page.locator('.viewer-toolbar [role="progressbar"]').getAttribute('aria-valuenow');
  const completeButton = () => page.getByRole('button', { name: 'Отметить карточку как изученную', exact: true });
  await mkdir('output/playwright', { recursive: true });
  await open('/courses/beginner-b2');
  assert.equal(await page.getByRole('link', { name: 'Начать курс →', exact: true }).getAttribute('href'), '/courses/beginner-b2/cards/01');
  assert.equal(await page.locator('.gallery-progress [role="progressbar"]').getAttribute('aria-valuenow'), '0');
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), PROGRESS_STORAGE_KEY), null);
  await page.getByRole('link', { name: 'Начать курс →', exact: true }).click();
  await completeButton().waitFor();
  assert.equal((await stored()).lastViewedCardId, 1); assert.deepEqual((await stored()).completedCardIds, []);
  await completeButton().click(); assert.equal(await completed(), '1');
  assert.equal(await page.getByRole('button', { name: 'Снять отметку изучено', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Показать карточки', exact: true }).click();
  assert.equal(await page.locator('.viewer-desktop-filmstrip [data-active="true"] .viewer-thumbnail__completed').count(), 1);
  await page.getByRole('button', { name: 'Снять отметку изучено', exact: true }).click(); assert.equal(await completed(), '0');
  assert.equal(await page.locator('.viewer-thumbnail__completed').count(), 0);
  for (const id of [1, 2, 3]) { await open(`/cards/0${id}`); await completeButton().click(); }
  await open('/courses/beginner-b2/cards/06'); await page.reload();
  await completeButton().waitFor(); assert.equal(await completed(), '3');
  assert.equal((await stored()).lastViewedCardId, 6);
  await open('/courses/beginner-b2');
  assert.equal(await page.getByRole('link', { name: /^Продолжить с карточки \d+ →$/ }).getAttribute('href'), '/courses/beginner-b2/cards/06');
  assert.equal(await page.locator('.gallery-progress [role="progressbar"]').getAttribute('aria-valuenow'), '3');
  await page.getByRole('button', { name: 'Сбросить прогресс', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Отмена', exact: true }).evaluate((button) => button === document.activeElement), true);
  await page.getByRole('button', { name: 'Отмена', exact: true }).click(); assert.equal((await stored()).completedCardIds.length, 3);
  await page.getByRole('button', { name: 'Сбросить прогресс', exact: true }).click(); await page.keyboard.press('Escape');
  assert.equal(await page.locator('.progress-reset-dialog').count(), 0);
  // Changes from a second tab update the current page without refresh.
  const other = await context.newPage();
  await other.goto(new URL('/courses/beginner-b2/cards/07', baseURL).href);
  await other.getByRole('button', { name: 'Отметить карточку как изученную', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.gallery-progress [role="progressbar"]')!.getAttribute('aria-valuenow') === '4');
  assert.equal(await page.getByRole('link', { name: /^Продолжить с карточки \d+ →$/ }).getAttribute('href'), '/courses/beginner-b2/cards/07');
  await page.getByRole('button', { name: 'Сбросить прогресс', exact: true }).click(); await page.getByRole('button', { name: 'Сбросить', exact: true }).click();
  assert.equal(await page.locator('.gallery-progress [role="progressbar"]').getAttribute('aria-valuenow'), '0');
  assert.equal(await page.getByRole('link', { name: 'Начать курс →', exact: true }).getAttribute('href'), '/courses/beginner-b2/cards/01');
  await other.waitForFunction(() => document.querySelector('.viewer-toolbar [role="progressbar"]')!.getAttribute('aria-valuenow') === '0');
  assert.equal(new URL(other.url()).pathname, '/courses/beginner-b2/cards/07');
  assert.equal((await stored()).lastViewedCardId, null, 'Reset in another tab must not immediately re-mark the current card viewed');
  await other.close();
  await page.evaluate((key) => localStorage.setItem(key, '{bad JSON'), PROGRESS_STORAGE_KEY); await page.reload();
  assert.equal(await page.locator('.gallery-progress [role="progressbar"]').getAttribute('aria-valuenow'), '0');
  await page.evaluate(({ key, courseId }) => localStorage.setItem(key, JSON.stringify({ version: 1, courses: { [courseId]: { lastViewedCardId: 99, completedCardIds: [1, 1, 2, 99, '3'], updatedAt: null } } })), { key: PROGRESS_STORAGE_KEY, courseId: BEGINNER_B2_COURSE_ID });
  await page.reload();
  assert.equal(await page.locator('.gallery-progress [role="progressbar"]').getAttribute('aria-valuenow'), '2');
  assert.equal(await page.getByRole('link', { name: /^Продолжить с карточки \d+ →$/ }).getAttribute('href'), '/courses/beginner-b2/cards/03');
  const seed = async (ids: readonly number[]) => {
    await page.evaluate(({ key, courseId, ids }) => localStorage.setItem(key, JSON.stringify({ version: 1, courses: { [courseId]: { lastViewedCardId: 7, completedCardIds: ids, updatedAt: null } } })), { key: PROGRESS_STORAGE_KEY, courseId: BEGINNER_B2_COURSE_ID, ids });
  };
  await seed(courseCardIds.filter((id) => id !== 8 && id !== 14));
  await open('/cards/14'); assert.equal(await completed(), '12');
  await completeButton().click(); assert.equal(await completed(), '13');
  await seed(courseCardIds); await open('/courses/beginner-b2');
  assert.equal(await page.getByRole('link', { name: 'Повторить курс →', exact: true }).getAttribute('href'), '/courses/beginner-b2/cards/01');
  assert.equal(await page.locator('.gallery-progress [role="progressbar"]').getAttribute('aria-valuenow'), String(totalCards));
  await page.screenshot({ path: 'output/playwright/progress-gallery.png', fullPage: true });
  await seed([1, 2, 3]);
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 1440, height: 900 }, { width: 820, height: 1180 }, { width: 390, height: 844 }, { width: 320, height: 780 }]) {
    await page.setViewportSize(viewport);
    for (const id of [1, 7, 14]) {
      await open(`/cards/${String(id).padStart(2, '0')}`);
      await page.locator('.card-completion').waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Progress UI overflows');
      assert.ok(await page.locator('.viewer-toolbar').evaluate((toolbar) => toolbar.scrollWidth <= toolbar.clientWidth), 'Toolbar controls overflow');
    }
    if (viewport.width === 1920) await page.screenshot({ path: 'output/playwright/progress-viewer-desktop.png' });
    if (viewport.width === 390) await page.screenshot({ path: 'output/playwright/progress-viewer-mobile.png' });
  }
  await page.setViewportSize({ width: 390, height: 844 }); await open('/courses/beginner-b2/cards/01');
  await page.locator('.viewer-navigation--mobile').getByRole('button', { name: 'Все карточки', exact: true }).click();
  assert.equal(await page.locator('.viewer-sheet .viewer-thumbnail__completed').count(), 3);
  assert.equal(await page.locator('.viewer-sheet [data-active="true"] .viewer-thumbnail__completed').count(), 1);
  await page.screenshot({ path: 'output/playwright/progress-mobile-sheet.png' });
  await page.getByRole('button', { name: 'Закрыть список карточек', exact: true }).click();
  await page.getByRole('button', { name: 'Режим фокуса', exact: true }).click();
  assert.equal(await page.locator('.card-completion').count(), 0); assert.equal(await page.locator('[role="progressbar"]').count(), 0);
  await page.keyboard.press('Escape'); assert.equal(await page.locator('.card-completion').getAttribute('aria-pressed'), 'true');
  await open('/print'); assert.equal(await page.locator('[data-a4-page]').count(), totalCards); assert.equal(await page.locator('[role="progressbar"], .card-completion, .viewer-thumbnail__completed').count(), 0);
  await open('/cards/01?export=1'); assert.equal(await page.locator('[data-a4-page]').count(), 1); assert.equal(await page.locator('[role="progressbar"], .card-completion').count(), 0);
  assert.deepEqual(errors, []);
  await context.close();
  console.log('OK progress UI: first visit, explicit completion, persistence, resume, confirmed reset, cross-tab sync, malformed storage, full completion, mobile, focus, export isolation');
});

