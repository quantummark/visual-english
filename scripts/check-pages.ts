import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { courseCards, cardPath } from '../src/data/courseCards';
import { withCourseBrowser } from './browser';
import { assertPageQuality, waitForCourse } from './page-quality';

await withCourseBrowser(async (browser, baseURL) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await mkdir('output/playwright', { recursive: true });
  await page.goto(new URL('/courses/beginner-b2', baseURL).href);
  assert.equal(await page.locator('.gallery-card').count(), courseCards.length);
  await page.screenshot({ path: 'output/playwright/gallery-desktop.png', fullPage: true });
  await page.locator('.gallery-card__link').first().click();
  await waitForCourse(page);
  assert.ok(page.url().endsWith(cardPath(1)));
  await page.locator('.viewer-card-page .course-footer a').click();
  await waitForCourse(page);
  assert.ok(page.url().endsWith(cardPath(2)));
  await page.goBack();
  await waitForCourse(page);
  assert.ok(page.url().endsWith(cardPath(1)));

  for (const card of courseCards) {
    await page.goto(new URL(`${cardPath(card.id)}?export=1`, baseURL).href);
    await waitForCourse(page);
    await assertPageQuality(page, 1);
    assert.equal(await page.locator('h1').textContent(), card.title);
    const links = page.locator('.course-footer a');
    assert.equal(await links.count(), Number(card.previous !== null) + Number(card.next !== null));
    if (card.previous !== null) assert.equal(await links.first().getAttribute('href'), cardPath(card.previous));
    if (card.next !== null) assert.equal(await links.last().getAttribute('href'), cardPath(card.next));
    console.log(`OK ${cardPath(card.id)}`);
  }

  await page.goto(new URL(cardPath(13), baseURL).href);
  await waitForCourse(page);
  const desktopDimensions = await page.locator('.viewer-card-page [data-a4-page]').evaluate((page) => [page.clientWidth, page.clientHeight]);
  await page.screenshot({ path: 'output/playwright/card-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  // Wait for ResizeObserver to apply the fit before checking its visible bounds.
  await page.waitForFunction(() => {
    const rect = document.querySelector('.viewer-card-page [data-a4-page]')?.getBoundingClientRect();
    return rect && rect.left >= 0 && rect.right <= innerWidth;
  });
  assert.deepEqual(await page.locator('.viewer-card-page [data-a4-page]').evaluate((page) => [page.clientWidth, page.clientHeight]), desktopDimensions, 'Preview changed internal A4 layout');
  await page.screenshot({ path: 'output/playwright/card-mobile.png' });
  await page.goto(new URL('/courses/beginner-b2', baseURL).href);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Gallery overflows mobile width');
  await page.screenshot({ path: 'output/playwright/gallery-mobile.png', fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(new URL('/print', baseURL).href);
  await waitForCourse(page);
  await assertPageQuality(page, courseCards.length);
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.print-toolbar').isVisible(), false);
  await assertPageQuality(page, courseCards.length);
  await page.goto(new URL('/cards/99', baseURL).href);
  assert.equal(await page.locator('h1').textContent(), 'Карточка не найдена');
  assert.deepEqual(errors, [], 'Browser runtime errors');
  console.log('OK gallery, footer navigation, mobile preview, print and unknown route');
  await page.close();
});

