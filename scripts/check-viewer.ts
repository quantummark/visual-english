import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { withCourseBrowser } from './browser';
import { waitForCourse } from './page-quality';

await withCourseBrowser(async (browser, baseURL) => {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const open = async (id: number) => { await page.goto(`${baseURL}cards/${String(id).padStart(2, '0')}`); await waitForCourse(page); };
  const scale = () => page.locator('.viewer-zoom__value').textContent();
  const slider = page.getByRole('slider', { name: 'Масштаб карточки' });
  const settleDrawer = async () => {
    await page.waitForFunction(() => {
      const drawer = document.querySelector('.viewer-desktop-filmstrip .viewer-filmstrip__drawer')!;
      const collapsed = drawer.parentElement!.getAttribute('data-collapsed') === 'true';
      return collapsed ? drawer.getBoundingClientRect().height < 1 : drawer.getBoundingClientRect().height >= 131;
    });
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  };
  const key = async (value: string) => { await page.locator('.viewer-viewport').focus(); await page.keyboard.press(value); };
  await mkdir('output/playwright', { recursive: true });
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 1024, height: 768 }, { width: 820, height: 1180 }]) {
    await page.setViewportSize(viewport);
    for (const id of [1, 7, 14]) {
      await open(id);
      await page.waitForFunction(() => {
        const card = document.querySelector('.viewer-card-frame')!.getBoundingClientRect();
        const viewport = document.querySelector('.viewer-viewport')!.getBoundingClientRect();
        return card.top >= viewport.top && card.bottom <= viewport.bottom + 1 && card.left >= viewport.left && card.right <= viewport.right;
      });
      assert.equal(await page.locator('.viewer-navigation--side .viewer-navigation__previous').count(), id === 1 ? 0 : 1);
      assert.equal(await page.locator('.viewer-navigation--side .viewer-navigation__next').count(), id === 14 ? 0 : 1);
      assert.equal(await page.locator('.viewer-navigation--text').count(), 0);
      assert.equal(await page.getByLabel('Показать карточки', { exact: true }).getAttribute('aria-expanded'), 'false');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const collapsedHeight = (await page.locator('.viewer-card-frame').boundingBox())!.height;
      await page.getByLabel('Показать карточки', { exact: true }).click();
      await settleDrawer();
      const expandedHeight = (await page.locator('.viewer-card-frame').boundingBox())!.height;
      if (viewport.width === 1920) assert.ok(collapsedHeight > expandedHeight + 100, 'Collapsed drawer must return reading space');
      await page.waitForFunction(() => {
        const active = document.querySelector('.viewer-desktop-filmstrip [aria-current="page"]')!.getBoundingClientRect();
        const strip = document.querySelector('.viewer-desktop-filmstrip .viewer-filmstrip__scroll')!.getBoundingClientRect();
        return active.left >= strip.left && active.right <= strip.right;
      });
    }
  }
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(7);
  await page.screenshot({ path: 'output/playwright/viewer-polish-collapsed.png' });
  await slider.fill('125'); assert.equal(await scale(), '125%');
  await slider.focus(); await page.keyboard.press('ArrowRight'); assert.equal(await scale(), '126%'); assert.ok(page.url().endsWith('/cards/07'));
  await key('0');
  await page.locator('.viewer-viewport').evaluate((host) => { host.scrollTop = 160; });
  const centerBefore = await page.locator('.viewer-viewport').evaluate((host) => {
    const area = host.getBoundingClientRect();
    const card = host.querySelector('.viewer-card-frame')!.getBoundingClientRect();
    return (area.top + host.clientHeight / 2 - card.top) / card.height;
  });
  await slider.fill('150');
  const centerAfter = await page.locator('.viewer-viewport').evaluate((host) => {
    const area = host.getBoundingClientRect();
    const card = host.querySelector('.viewer-card-frame')!.getBoundingClientRect();
    return (area.top + host.clientHeight / 2 - card.top) / card.height;
  });
  assert.ok(Math.abs(centerBefore - centerAfter) < .01, 'Zoom lost the reading center');
  assert.equal(await slider.inputValue(), '150');
  await page.screenshot({ path: 'output/playwright/viewer-polish-zoomed.png' });
  const arrowBefore = await page.locator('.viewer-navigation--side').boundingBox();
  await page.locator('.viewer-viewport').evaluate((host) => { host.scrollTop += 200; });
  assert.deepEqual(await page.locator('.viewer-navigation--side').boundingBox(), arrowBefore, 'Side arrows moved with the card');
  await key('0'); assert.equal(await scale(), '100%');
  await key('+'); assert.equal(await scale(), '110%');
  assert.equal(await slider.inputValue(), '110');
  await key('ArrowRight'); assert.ok(page.url().endsWith('/cards/08')); assert.equal(await scale(), '110%');
  await key('ArrowLeft'); assert.ok(page.url().endsWith('/cards/07'));
  await page.goBack(); assert.ok(page.url().endsWith('/cards/08'));
  await page.goForward(); assert.ok(page.url().endsWith('/cards/07'));
  await key('-'); assert.equal(await scale(), '100%');
  for (let index = 0; index < 15; index++) await key('+');
  assert.equal(await scale(), '200%'); assert.equal(await page.getByLabel('Увеличить масштаб', { exact: true }).isDisabled(), true);
  for (let index = 0; index < 15; index++) await key('-');
  assert.equal(await scale(), '50%'); assert.equal(await page.getByLabel('Уменьшить масштаб', { exact: true }).isDisabled(), true);
  await key('0');
  await page.locator('.viewer-viewport').hover();
  await page.keyboard.down('Control'); await page.mouse.wheel(0, -100); await page.keyboard.up('Control');
  await page.waitForFunction(() => document.querySelector('.viewer-zoom__value')!.textContent === '110%');
  assert.equal(await slider.inputValue(), '110');
  await page.getByLabel('Подогнать карточку').focus(); await page.keyboard.press('ArrowLeft'); assert.ok(page.url().endsWith('/cards/07'));
  await page.getByRole('button', { name: 'Показать карточки' }).click(); await settleDrawer();
  await page.getByRole('button', { name: 'Скрыть карточки' }).click(); await settleDrawer();
  await key('ArrowRight'); assert.equal(await page.locator('#course-filmstrip').isVisible(), false);
  await page.getByRole('button', { name: 'Показать карточки' }).click();
  await settleDrawer();
  await key('f');
  await page.screenshot({ path: 'output/playwright/viewer-desktop.png' });
  const beforeFocus = await page.locator('.viewer-card-frame').boundingBox();
  await page.getByLabel('Режим фокуса', { exact: true }).click();
  assert.equal(await page.locator('.viewer-toolbar').count(), 0);
  assert.equal(await page.locator('.viewer-desktop-filmstrip').count(), 0);
  assert.equal((await page.locator('.viewer-card-frame').boundingBox())!.width, beforeFocus!.width);
  await key('f');
  await page.waitForFunction(() => {
    const card = document.querySelector('.viewer-card-frame')!.getBoundingClientRect();
    const viewport = document.querySelector('.viewer-viewport')!.getBoundingClientRect();
    return card.bottom <= viewport.bottom + 1;
  });
  await page.screenshot({ path: 'output/playwright/viewer-focus.png' });
  await page.keyboard.press('Escape'); assert.equal(await page.locator('.viewer-toolbar').count(), 1);
  assert.equal(await page.getByLabel('Скрыть карточки', { exact: true }).getAttribute('aria-expanded'), 'true');
  await page.getByLabel('Скрыть карточки', { exact: true }).click(); await settleDrawer();
  const collapsedScale = await scale();
  await page.getByLabel('Режим фокуса', { exact: true }).click();
  assert.equal(await page.locator('.viewer-filmstrip__handle').count(), 0);
  await page.keyboard.press('Escape');
  assert.equal(await scale(), collapsedScale);
  assert.equal(await page.getByLabel('Показать карточки', { exact: true }).getAttribute('aria-expanded'), 'false');
  await page.setViewportSize({ width: 390, height: 844 });
  await open(4);
  assert.equal(await page.locator('.card-viewer').getAttribute('data-fit-mode'), 'width');
  assert.equal(await page.locator('.viewer-desktop-filmstrip').isVisible(), false);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.equal(await page.locator('.viewer-filmstrip__handle').isVisible(), false);
  assert.equal(await slider.inputValue(), (await scale())!.replace('%', ''));
  await page.locator('.viewer-viewport').evaluate((host) => { host.scrollTop = host.scrollHeight; });
  await page.waitForFunction(() => {
    const card = document.querySelector('.viewer-card-frame')!.getBoundingClientRect();
    const bottom = document.querySelector('.viewer-mobile-nav')!.getBoundingClientRect();
    return card.bottom <= bottom.top;
  });
  await page.locator('.viewer-navigation--mobile .viewer-navigation__previous').click(); assert.ok(page.url().endsWith('/cards/03'));
  await page.locator('.viewer-navigation--mobile .viewer-navigation__next').click();
  await page.locator('.viewer-navigation--mobile .viewer-navigation__next').click(); assert.ok(page.url().endsWith('/cards/05'));
  await page.locator('.viewer-navigation--mobile').getByLabel('Все карточки').click();
  assert.equal(await page.locator('.viewer-sheet .viewer-thumbnail').count(), 14);
  await page.screenshot({ path: 'output/playwright/viewer-mobile-sheet.png' });
  await page.locator('.viewer-sheet').getByRole('link', { name: /^Карточка 10:/ }).click();
  assert.ok(page.url().endsWith('/cards/10')); assert.equal(await page.locator('.viewer-sheet').count(), 0);
  assert.equal(await page.locator('.viewer-viewport').evaluate((host) => host.scrollTop), 0);
  await page.getByLabel('Увеличить масштаб', { exact: true }).click();
  await slider.fill('100'); assert.equal(await scale(), '100%');
  await page.getByLabel('Подогнать карточку').selectOption('width');
  await page.getByLabel('Режим фокуса', { exact: true }).click();
  await page.getByLabel('Выйти из режима фокуса').click();
  for (const id of [1, 7, 14]) { await open(id); await page.screenshot({ path: `output/playwright/viewer-mobile-${id}.png` }); }
  await open(8); await page.reload(); assert.equal(await page.locator('.viewer-card-page h1').textContent(), 'Предлоги и готовые фразы');
  await page.goto(`${baseURL}print`); assert.equal(await page.locator('[data-a4-page]').count(), 14); assert.equal(await page.locator('.card-viewer').count(), 0);
  await page.goto(`${baseURL}cards/01?export=1`); assert.equal(await page.locator('[data-a4-page]').count(), 1); assert.equal(await page.locator('.card-viewer').count(), 0);
  assert.deepEqual(errors, []);
  await page.close();
  console.log('OK viewer: desktop/mobile, zoom limits/wheel, keyboard/history, fit, filmstrip, focus, drawer, export isolation');
});
