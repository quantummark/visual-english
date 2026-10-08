import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { b2C1Cards } from '../src/courses/b2C1/cards';
import { PROGRESS_STORAGE_KEY } from '../src/progress/progressStorage';
import { withCourseBrowser } from './browser';
import { assertPageQuality, waitForCourse } from './page-quality';

await withCourseBrowser(async (browser, baseURL) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const overview = '/courses/b2-c1';
  const cardPath = (number: number) => `${overview}/cards/${String(number).padStart(2, '0')}`;
  const open = (path: string) => page.goto(new URL(path, baseURL).href);
  const readCourses = () => page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? '{"courses":{}}').courses, PROGRESS_STORAGE_KEY);
  const key = async (value: string) => { await page.locator('.viewer-viewport').focus(); await page.keyboard.press(value); };
  await mkdir('output/playwright', { recursive: true });

  await open('/');
  await page.evaluate((storageKey) => {
    localStorage.setItem(storageKey, JSON.stringify({ version: 1, courses: {
      'beginner-b2': { completedCardIds: [1, 2, 3], lastViewedCardId: 6, updatedAt: '2026-10-02T00:00:00.000Z' },
    } }));
  }, PROGRESS_STORAGE_KEY);
  const beginnerBefore = (await readCourses())['beginner-b2'];
  await open(overview);
  assert.equal(await page.title(), 'B2 → C1 · Visual English Lab');
  assert.equal(await page.getByText('Advanced English', { exact: true }).count(), 1);
  assert.equal(await page.locator('.course-overview__header .course-soon, .course-development-note').count(), 0);
  assert.deepEqual(await page.locator('.course-stage').evaluateAll((stages) => stages.map((stage) => stage.querySelectorAll('.lesson-tile').length)), [4, 4, 3, 3]);
  assert.deepEqual(await page.locator('.lesson-tile__body > h3').allTextContents(), b2C1Cards.map((card) => card.title));
  assert.equal(await page.locator('.course-overview__actions a[href="/courses/b2-c1/print"]').count(), 1);
  assert.equal(await page.getByRole('link', { name: 'Начать курс →', exact: true }).getAttribute('href'), cardPath(1));
  assert.equal((await readCourses())['b2-c1'], undefined, 'Overview must not create progress');

  for (const card of b2C1Cards) {
    await open(`${cardPath(card.number)}?export=1`);
    await waitForCourse(page);
    await assertPageQuality(page, 1);
    assert.equal(await page.title(), `${card.title} · Visual English Lab`);
    assert.equal(await page.locator('h1').textContent(), card.title);
    assert.equal(await page.locator('.course-header__top').textContent(), `B2 → C1${String(card.number).padStart(2, '0')} / 14`);
    assert.equal(await page.locator('.course-header__category').textContent(), card.category);
    assert.equal(await page.locator('.advanced-placeholder__message').count(), 0);
    if (card.number === 1) {
      assert.equal(await page.getByRole('list', { name: 'Способы выразить отношение к мысли' }).getByRole('listitem').count(), 6);
      assert.equal(await page.getByRole('heading', { name: 'C1 ≠ complicated' }).count(), 1);
      assert.equal(await page.getByRole('region', { name: 'Попробуй выбрать оттенок' }).getByRole('listitem').count(), 4);
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(2));
    }
    if (card.number === 2) {
      const map = page.getByRole('region', { name: 'ZONES OF CERTAINTY' });
      assert.equal(await map.locator('dt').count(), 5);
      assert.equal(await map.locator('strong').count(), 7);
      assert.equal(await page.getByRole('region', { name: 'Выбери сильный вывод' }).getByRole('listitem').count(), 3);
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(3));
      assert.doesNotMatch(await map.textContent() ?? '', /\d+\s*%/, 'The certainty map must not assign fixed percentages');
    }
    if (card.number === 3) {
      assert.equal(await page.getByRole('list', { name: 'Варианты дистанции и тона' }).getByRole('listitem').count(), 4);
      assert.equal(await page.getByRole('region', { name: 'Выбери тон', exact: true }).getByRole('listitem').count(), 3);
      assert.equal(await page.locator('#tone-model').count(), 1);
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(4));
    }
    if (card.number === 4) {
      assert.equal(await page.getByRole('region', { name: 'IDEA → FOCUS → FORM', exact: true }).count(), 1);
      assert.equal(await page.getByRole('region', { name: 'Направь внимание' }).getByRole('listitem').count(), 2);
      assert.equal(await page.getByRole('region', { name: 'Структура + голос' }).locator('b').count(), 3);
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(5));
    }
    if (card.number === 5) {
      const layers = page.getByRole('list', { name: 'Как растёт мысль о запуске' });
      assert.equal(await layers.getByRole('listitem').count(), 4);
      assert.equal(await layers.getByRole('listitem').last().locator('b').textContent(), 'especially on mobile.');
      assert.equal(await page.getByRole('region', { name: 'Построй мысль' }).getByRole('listitem').count(), 2);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'purple');
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(6));
    }
    if (card.number === 6) {
      const chain = page.getByRole('list', { name: 'Логическая цепочка запуска' });
      assert.equal(await chain.getByRole('listitem').count(), 3);
      assert.deepEqual(await chain.locator('strong').allTextContents(), ["The system wasn't ready.", 'We delayed the launch.', 'We had more time to test.']);
      assert.equal(await page.getByRole('region', { name: 'Причина ≠ цель' }).locator('b').count(), 2);
      assert.equal(await page.getByRole('region', { name: 'Покажи логику' }).count(), 1);
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(7));
    }
    if (card.number === 7) {
      const balance = page.getByRole('region', { name: 'SIDE A ↔ SIDE B', exact: true });
      assert.deepEqual(await balance.locator('strong').allTextContents(), ['The product is simple.', 'It has some limitations.']);
      assert.equal(await page.getByRole('region', { name: 'Сохрани обе стороны' }).getByRole('listitem').count(), 3);
      assert.equal(await page.locator('#balance-shapes').count(), 1);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'purple');
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(8));
    }
    if (card.number === 8) {
      const timeline = page.getByRole('region', { name: 'REAL TIMELINE ↔ ALTERNATIVE TIMELINE', exact: true });
      assert.deepEqual(await timeline.locator('strong').allTextContents(), ["We didn't act earlier.", 'Things are difficult now.', "If we'd acted earlier…", '…things might be different now.']);
      assert.equal(await timeline.getByRole('listitem').count(), 4);
      assert.equal(await page.getByRole('list', { name: 'Как построить альтернативу' }).getByRole('listitem').count(), 4);
      assert.equal(await page.getByRole('region', { name: 'Измени прошлое', exact: true }).count(), 1);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'purple');
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(9));
    }
    if (card.number === 9) {
      const partners = page.getByRole('list', { name: 'Пять партнёров слова decision' });
      assert.deepEqual(await partners.locator('strong').allTextContents(), ['make a decision', 'reach a decision', 'reconsider a decision', 'a difficult decision', 'a final decision']);
      assert.equal(await page.getByRole('list', { name: 'От слов к готовым блокам' }).getByRole('listitem').count(), 3);
      assert.equal(await page.getByRole('region', { name: 'Выбери естественного соседа', exact: true }).getByRole('listitem').count(), 2);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'teal');
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(10));
    }
    if (card.number === 10) {
      const rebuild = page.getByRole('list', { name: 'Пересобери мысль о симпатии' });
      assert.deepEqual(await rebuild.locator('strong').allTextContents(), ['Мне это очень нравится.', 'Выразить сильную симпатию.', 'I really like it.']);
      assert.equal(await page.getByRole('region', { name: 'Пересобери смысл', exact: true }).getByRole('listitem').count(), 3);
      assert.equal(await page.getByRole('region', { name: 'Проблема в паттерне, не в propose' }).count(), 1);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'teal');
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(11));
    }
    if (card.number === 11) {
      assert.equal(await page.getByRole('list', { name: 'Три цели продвинутого английского' }).getByRole('listitem').count(), 3);
      assert.equal(await page.getByRole('region', { name: 'Сохрани смысл. Убери повторы.' }).getByRole('listitem').count(), 2);
      assert.equal(await page.getByRole('heading', { name: 'HEAVY → CLEAR → PRECISE', exact: true }).count(), 1);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'teal');
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(12));
    }
    if (card.number === 12) {
      const route = page.getByRole('list', { name: 'Пять блоков ответа про remote work' });
      assert.equal(await route.getByRole('listitem').count(), 5);
      assert.deepEqual(await route.locator('strong').allTextContents(), ['POSITION', 'REASON', 'EXAMPLE', 'OTHER SIDE', 'CONCLUSION']);
      assert.deepEqual(await route.locator('b').allTextContents(), ['I think', 'The main reason is', 'For example,', 'That said,', 'Overall,']);
      assert.equal(await page.getByRole('list', { name: 'Карта ответа про AI' }).getByRole('listitem').count(), 5);
      assert.equal(await page.getByRole('region', { name: 'Длинный ответ не равен длинному предложению' }).count(), 1);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'cyan');
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(13));
    }
    if (card.number === 13) {
      const cycle = page.getByRole('list', { name: 'Цикл живой речи' });
      assert.deepEqual(await cycle.locator('strong').allTextContents(), ['THINK', 'SPEAK', 'ADJUST', 'CONTINUE']);
      assert.equal(await page.getByRole('list', { name: 'Четыре функции речевых сигналов' }).getByRole('listitem').count(), 4);
      assert.equal(await page.getByRole('list', { name: 'От цены к ценности' }).getByRole('listitem').count(), 3);
      assert.equal(await page.getByRole('region', { name: 'Уточни, не начиная заново' }).count(), 1);
      assert.equal(await page.getByRole('region', { name: 'Ориентир в моменте' }).getByRole('listitem').count(), 6);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'cyan');
      assert.equal(await page.locator('.course-footer a').getAttribute('href'), cardPath(14));
    }
    if (card.number === 14) {
      assert.equal(await page.getByRole('list', { name: 'Три сигнала для понимания намерения' }).getByRole('listitem').count(), 3);
      assert.equal(await page.getByRole('list', { name: "Два контекста фразы That's interesting" }).getByRole('listitem').count(), 2);
      assert.equal(await page.getByRole('list', { name: 'Три ситуации для интерпретации' }).getByRole('listitem').count(), 3);
      assert.equal(await page.getByRole('list', { name: 'Четыре этапа курса' }).getByRole('listitem').count(), 4);
      assert.equal(await page.locator('[data-a4-page]').getAttribute('data-accent'), 'cyan');
      assert.equal(await page.locator('.course-footer a').count(), 0);
      assert.match(await page.locator('.course-footer').textContent() ?? '', /Курс завершён/);
    }
    if (card.number <= 14) {
      await mkdir('exports/b2-c1', { recursive: true });
      const previewName = ['01-precision', '02-certainty', '03-tone', '04-focus', '05-layers', '06-cause', '07-balance', '08-alternative', '09-partners', '10-rebuild', '11-control', '12-route', '13-loop', '14-meaning'][card.number - 1];
      const previewPath = `exports/b2-c1/${previewName}-preview.png`;
      await page.locator('[data-a4-page]').screenshot({ path: previewPath, animations: 'disabled', scale: 'device' });
      const png = await readFile(previewPath);
      assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1588, 2246]);
    }
    assert.equal(await page.locator('a[href^="/courses/beginner-b2"]').count(), 0);
  }
  assert.equal((await readCourses())['b2-c1'], undefined, 'Export views must not create progress');

  await open(cardPath(1));
  assert.equal(await page.getByRole('link', { name: 'К курсу', exact: true }).getAttribute('href'), overview);
  assert.equal(await page.locator('.viewer-course-label').textContent(), 'B2 → C1');
  assert.equal(await page.locator('.viewer-navigation--side .viewer-navigation__previous').count(), 0);
  assert.equal(await page.locator('.viewer-pdf').getAttribute('href'), '/courses/b2-c1/print');
  const slider = page.getByRole('slider', { name: 'Масштаб карточки' });
  for (const zoom of [100, 125, 150]) {
    await slider.fill(String(zoom));
    assert.equal(await page.locator('.viewer-zoom__value').textContent(), `${zoom}%`);
    assert.deepEqual(await page.locator('.viewer-card-page [data-a4-page]').evaluate((card) => [card.clientWidth, card.clientHeight, card.scrollWidth, card.scrollHeight]), [794, 1123, 794, 1123]);
  }
  for (const mode of ['width', 'page']) {
    await page.getByRole('combobox', { name: 'Подогнать карточку' }).selectOption(mode);
    assert.equal(await page.locator('.card-viewer').getAttribute('data-fit-mode'), mode);
  }
  await page.getByRole('button', { name: 'Режим фокуса', exact: true }).click();
  assert.equal(await page.locator('.card-viewer--focus').count(), 1);
  assert.equal(await page.locator('.viewer-card-page').getByRole('list', { name: 'Способы выразить отношение к мысли' }).getByRole('listitem').count(), 6);
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Отметить карточку как изученную', exact: true }).click();
  assert.deepEqual((await readCourses())['b2-c1'].completedCardIds, [1]);
  assert.deepEqual((await readCourses())['beginner-b2'], beginnerBefore, 'Completion must remain isolated');
  await page.locator('.viewer-navigation--side').getByRole('link', { name: 'Следующая карточка' }).click();
  await page.waitForURL(new URL(cardPath(2), baseURL).href);
  await key('ArrowRight');
  await page.waitForURL(new URL(cardPath(3), baseURL).href);
  await key('ArrowLeft');
  await page.waitForURL(new URL(cardPath(2), baseURL).href);
  for (const zoom of [100, 125, 150]) {
    await page.getByRole('slider', { name: 'Масштаб карточки' }).fill(String(zoom));
    assert.equal(await page.locator('.viewer-zoom__value').textContent(), `${zoom}%`);
    assert.deepEqual(await page.locator('.viewer-card-page [data-a4-page]').evaluate((card) => [card.clientWidth, card.clientHeight, card.scrollWidth, card.scrollHeight]), [794, 1123, 794, 1123]);
    await assertPageQuality(page.locator('.viewer-card-page'), 1);
  }
  await page.getByRole('combobox', { name: 'Подогнать карточку' }).selectOption('width');
  assert.equal(await page.locator('.card-viewer').getAttribute('data-fit-mode'), 'width');
  await page.getByRole('combobox', { name: 'Подогнать карточку' }).selectOption('page');
  assert.equal(await page.locator('.card-viewer').getAttribute('data-fit-mode'), 'page');
  await page.getByRole('button', { name: 'Режим фокуса', exact: true }).click();
  assert.equal(await page.locator('.card-viewer--focus').count(), 1);
  assert.equal(await page.locator('.viewer-card-page').getByRole('region', { name: 'ZONES OF CERTAINTY' }).locator('dt').count(), 5);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.card-viewer--focus').count(), 0);
  await page.getByRole('button', { name: 'Показать карточки', exact: true }).click();
  const strip = page.locator('.viewer-desktop-filmstrip');
  assert.equal(await strip.locator('.viewer-thumbnail').count(), 14);
  assert.deepEqual(await strip.locator('.viewer-thumbnail__caption span').allTextContents(), b2C1Cards.map((card) => card.shortTitle));
  assert.equal(await strip.locator('.viewer-thumbnail__completed').count(), 1);
  assert.equal(await strip.locator('a:not([href^="/courses/b2-c1/cards/"])').count(), 0);
  assert.equal(await strip.locator('[aria-current="page"]').getAttribute('href'), cardPath(2));
  await open(cardPath(14));
  assert.equal(await page.locator('.viewer-navigation--side .viewer-navigation__next').count(), 0);
  await key('ArrowRight');
  assert.equal(new URL(page.url()).pathname, cardPath(14));
  await open(cardPath(1));
  await key('ArrowLeft');
  assert.equal(new URL(page.url()).pathname, cardPath(1));

  await open(overview);
  assert.equal(await page.locator('.course-overview__progress [role="progressbar"]').getAttribute('aria-valuenow'), '1');
  await open('/');
  const catalog = page.locator('.catalog-course').filter({ has: page.getByRole('heading', { name: 'B2 → C1', exact: true }) });
  assert.equal(await page.locator('.catalog-course--soon').count(), 0);
  assert.equal(await catalog.getByRole('progressbar').getAttribute('aria-valuenow'), '1');
  assert.equal(await catalog.getByRole('link').textContent(), 'Продолжить →');
  assert.equal(await catalog.locator('.catalog-course__meta').textContent(), '14 карточек · 4 этапа');
  await open(overview);
  await page.getByRole('button', { name: 'Сбросить прогресс', exact: true }).click();
  await page.getByRole('button', { name: 'Сбросить', exact: true }).click();
  assert.equal(await page.locator('.course-overview__progress [role="progressbar"]').getAttribute('aria-valuenow'), '0');
  assert.deepEqual((await readCourses())['beginner-b2'], beginnerBefore, 'Reset must remain isolated');

  for (const viewport of [{ width: 1440, height: 900 }, { width: 820, height: 1180 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await open(overview);
    await page.evaluate(async () => { await document.fonts.ready; });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Course overview overflows');
    await page.screenshot({ path: `output/playwright/b2-c1-overview-${viewport.width}.png`, fullPage: true });
    await open(cardPath(14));
    await waitForCourse(page);
    await page.waitForFunction(() => {
      const frame = document.querySelector('.viewer-card-frame')!.getBoundingClientRect();
      const host = document.querySelector('.viewer-viewport')!.getBoundingClientRect();
      return frame.left >= host.left && frame.right <= host.right + 1 && frame.top >= host.top && frame.bottom <= host.bottom + 1;
    });
    assert.deepEqual(await page.locator('.viewer-card-page [data-a4-page]').evaluate((card) => [card.clientWidth, card.clientHeight]), [794, 1123]);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Viewer overflows');
    await page.screenshot({ path: `output/playwright/b2-c1-card14-viewer-${viewport.width}.png` });
    for (const zoom of [100, 125, 150]) {
      await page.getByRole('slider', { name: 'Масштаб карточки' }).fill(String(zoom));
      assert.equal(await page.locator('.viewer-zoom__value').textContent(), `${zoom}%`);
      await assertPageQuality(page.locator('.viewer-card-page'), 1);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Zoom must scroll inside the viewer');
    }
    for (const mode of ['width', 'page']) {
      await page.getByRole('combobox', { name: 'Подогнать карточку' }).selectOption(mode);
      assert.equal(await page.locator('.card-viewer').getAttribute('data-fit-mode'), mode);
      await assertPageQuality(page.locator('.viewer-card-page'), 1);
    }
    await page.getByRole('button', { name: 'Режим фокуса', exact: true }).click();
    assert.equal(await page.locator('.card-viewer--focus').count(), 1);
    assert.equal(await page.locator('.viewer-card-page').getByRole('list', { name: 'Три сигнала для понимания намерения' }).getByRole('listitem').count(), 3);
    await assertPageQuality(page.locator('.viewer-card-page'), 1);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.card-viewer--focus').count(), 0);
    if (viewport.width === 390) {
      await page.getByRole('button', { name: 'Все карточки', exact: true }).click();
      const sheet = page.getByRole('dialog');
      assert.equal(await sheet.locator('.viewer-thumbnail').count(), 14);
      assert.equal(await sheet.locator('a:not([href^="/courses/b2-c1/cards/"])').count(), 0);
      assert.deepEqual(await sheet.locator('.viewer-thumbnail__caption span').allTextContents(), b2C1Cards.map((card) => card.shortTitle));
      await page.screenshot({ path: 'output/playwright/b2-c1-card14-mobile-picker.png' });
      await sheet.locator('.viewer-thumbnail__caption[href="/courses/b2-c1/cards/13"]').click();
      await page.waitForURL(new URL(cardPath(13), baseURL).href);
      assert.equal(await page.getByRole('dialog').count(), 0);
      assert.equal(await page.locator('.viewer-card-page h1').textContent(), b2C1Cards[12].title);
    } else {
      await page.getByRole('button', { name: 'Показать карточки', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.viewer-desktop-filmstrip .viewer-filmstrip__drawer')!.getBoundingClientRect().height >= 131);
      await page.screenshot({ path: `output/playwright/b2-c1-card14-filmstrip-${viewport.width}.png` });
    }
  }

  await open('/courses/b2-c1/cards/99');
  assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Карточка не найдена');
  assert.equal(await page.getByRole('link', { name: 'К курсу →' }).getAttribute('href'), overview);
  await open('/courses/missing/cards/01');
  assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Карточка не найдена');
  // Seed the first thirteen in this isolated browser context; the final card needs an explicit click.
  await page.evaluate((storageKey) => {
    const store = JSON.parse(localStorage.getItem(storageKey)!);
    store.courses['b2-c1'] = { completedCardIds: Array.from({ length: 13 }, (_, i) => i + 1), lastViewedCardId: 13, updatedAt: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(store));
  }, PROGRESS_STORAGE_KEY);
  await page.setViewportSize({ width: 1440, height: 900 });
  await open(cardPath(14));
  assert.equal((await readCourses())['b2-c1'].completedCardIds.length, 13, 'Opening the last card must not complete it');
  assert.equal(await page.locator('.viewer-navigation--side .viewer-navigation__next').count(), 0);
  await page.getByRole('button', { name: 'Отметить карточку как изученную', exact: true }).click();
  assert.deepEqual((await readCourses())['b2-c1'].completedCardIds, b2C1Cards.map((card) => card.id));
  await page.reload();
  assert.equal((await readCourses())['b2-c1'].completedCardIds.length, 14, 'Completion must persist');
  await open(overview);
  const complete = page.locator('.course-overview__progress [role="progressbar"]');
  assert.equal(await complete.getAttribute('aria-valuenow'), '14');
  assert.equal(await complete.getAttribute('aria-valuemax'), '14');
  assert.equal(await complete.locator('span').evaluate((node) => (node as HTMLElement).style.width), '100%');
  assert.equal(await page.getByRole('link', { name: 'Повторить курс →', exact: true }).getAttribute('href'), cardPath(1));
  assert.deepEqual((await readCourses())['beginner-b2'], beginnerBefore, 'Full completion must remain course-isolated');
  await page.screenshot({ path: 'output/playwright/b2-c1-completed-14.png', fullPage: true });
  await open('/');
  assert.equal(await catalog.getByRole('progressbar').getAttribute('aria-valuenow'), '14');
  assert.equal(await catalog.getByRole('link', { name: 'Повторить курс →', exact: true }).getAttribute('href'), overview);
  assert.deepEqual(errors, []);
  await context.close();
  console.log('OK B2 → C1: published Cards 01–14, 1588×2246 previews, approved models and practice, 100/125/150% and fit/focus, 4 stages, navigation, Card 14 filmstrip/mobile picker and responsive layouts, explicit 14/14 and 100% completion, progress isolation/reset, course-aware print links, invalid routes');
});
