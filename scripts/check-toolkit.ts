import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { withCourseBrowser } from './browser';
import { PROGRESS_STORAGE_KEY } from '../src/progress/progressStorage';
import { sentencePacks } from '../src/toolkit/sentencePacks/sentencePackRegistry';
import { thinkInEnglishResources } from '../src/toolkit/thinkInEnglish/thinkInEnglishRegistry';
import { getToolkitResourceCount } from '../src/toolkit/toolkitRegistry';
import { resolveToolkitRoute, toolkitResourcePath } from '../src/toolkit/toolkitRoutes';

assert.equal(sentencePacks.length, 12);
assert.equal(thinkInEnglishResources.length, 8);
assert.equal(new Set(sentencePacks.map((pack) => pack.slug)).size, sentencePacks.length);
assert.equal(new Set(thinkInEnglishResources.map((resource) => resource.slug)).size, thinkInEnglishResources.length);
assert.equal(getToolkitResourceCount('sentence-packs'), 12);
assert.equal(getToolkitResourceCount('think-in-english'), 8);
assert.equal(resolveToolkitRoute('/courses/beginner-b2'), undefined);

await withCourseBrowser(async (browser, baseURL) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const open = async (path: string) => {
    await page.goto(new URL(path, baseURL).href);
    await page.getByRole('heading', { level: 1 }).waitFor();
  };
  const storage = () => page.evaluate(() => JSON.stringify(Object.fromEntries(Object.keys(localStorage).map((key) => [key, localStorage.getItem(key)]))));
  const visibleSlugs = () => page.locator('[data-resource-slug]').evaluateAll((cards) => cards.map((card) => card.getAttribute('data-resource-slug')));
  await mkdir('output/playwright', { recursive: true });
  await open('/');
  assert.equal(await storage(), '{}');
  assert.ok(await page.locator('#courses').evaluate((courses) => !!courses.nextElementSibling?.classList.contains('home-toolkit')));
  assert.deepEqual(await page.locator('.home-toolkit .toolkit-count').allTextContents(), ['12 наборов', '8 материалов']);
  await page.locator('.home-toolkit').getByRole('link', { name: 'Открыть наборы →', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/toolkit/sentence-packs');
  await page.locator('[data-resource-slug]').first().waitFor();
  assert.equal(await page.locator('[data-resource-slug]').count(), 12);
  const level = page.getByRole('group', { name: 'Уровень', exact: true });
  const topic = page.getByRole('group', { name: 'Тема', exact: true });
  await level.getByRole('button', { name: 'B2', exact: true }).click();
  await topic.getByRole('button', { name: 'Work', exact: true }).click();
  assert.deepEqual(await visibleSlugs(), ['meetings', 'agreeing-disagreeing', 'problems-solutions']);
  assert.equal(await level.getByRole('button', { name: 'B2', exact: true }).getAttribute('aria-pressed'), 'true');
  assert.equal(new URL(page.url()).search, '?level=b2&topic=work');
  await page.reload(); assert.equal(await page.locator('[data-resource-slug]').count(), 3);
  await page.goBack(); assert.equal(await page.locator('[data-resource-slug]').count(), 4);
  await page.goForward(); assert.equal(await page.locator('[data-resource-slug]').count(), 3);
  await page.getByRole('link', { name: 'Открыть Meetings', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/toolkit/sentence-packs/meetings');
  await page.locator('.toolkit-content-section h2').first().waitFor();
  assert.deepEqual(await page.locator('.toolkit-content-section h2').allTextContents(), ['Core Patterns', 'Ready Sentences', 'Change the Pattern', 'Mini Dialogue', 'Practice']);
  await page.getByRole('link', { name: '← Все Sentence Packs', exact: true }).click();
  await level.getByRole('button', { name: 'B2–C1', exact: true }).click();
  assert.equal(await page.locator('[data-resource-slug]').count(), 0);
  assert.equal(await page.locator('.toolkit-empty').count(), 1);
  await page.getByRole('button', { name: 'Сбросить фильтры', exact: true }).click();
  assert.equal(await page.locator('[data-resource-slug]').count(), 12);
  assert.equal(await page.getByRole('button', { name: 'Сбросить', exact: true }).count(), 0);
  await open('/toolkit/sentence-packs?level=invalid&topic=invalid');
  assert.equal(await page.locator('[data-resource-slug]').count(), 12);
  await open('/toolkit/think-in-english');
  assert.equal(await page.locator('[data-resource-slug]').count(), 8);
  await page.getByRole('button', { name: 'Строим мысль', exact: true }).click();
  assert.deepEqual(await visibleSlugs(), ['thinking-in-blocks', 'why-english-needs-a-subject', 'do-not-translate-the-whole-sentence', 'native-speakers-think-in-chunks']);
  await page.getByRole('link', { name: 'Понять идею: Английский думает блоками', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForURL(new URL('/toolkit/think-in-english/thinking-in-blocks', baseURL).href);
  assert.equal(new URL(page.url()).pathname, '/toolkit/think-in-english/thinking-in-blocks');
  await page.locator('.toolkit-big-model').waitFor();
  assert.equal(await page.locator('.toolkit-big-model .thought-model__block').count(), 4);
  assert.equal(await page.locator('.toolkit-example-list .toolkit-example').count(), 2);
  assert.equal(await storage(), '{}', 'Browsing Toolkit must not create progress');
  const seeded = JSON.stringify({ version: 1, courses: { 'beginner-b2': { completedCardIds: [1, 2, 3], lastViewedCardId: 6, updatedAt: '2026-10-02T00:00:00.000Z' } } });
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), { key: PROGRESS_STORAGE_KEY, value: seeded });
  const before = await storage();
  for (const [category, resources] of [['sentence-packs', sentencePacks], ['think-in-english', thinkInEnglishResources]] as const) {
    for (const resource of resources) {
      await open(toolkitResourcePath(category, resource.slug));
      assert.equal(await page.title(), `${resource.title} · Visual English Lab`);
      assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), resource.title);
      assert.equal(await page.locator('.toolkit-template-notice').count(), 1);
      assert.equal(await page.locator('[role="progressbar"], .card-viewer, [data-a4-page], .card-completion').count(), 0);
    }
    await open(`/toolkit/${category}/unknown`);
    assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Материал не найден');
    assert.equal(await page.getByRole('link', { name: '← Вернуться к библиотеке' }).getAttribute('href'), `/toolkit/${category}`);
  }
  await open('/toolkit/unknown'); assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Материал не найден');
  const routes = [
    ['/', 'home'], ['/toolkit', 'overview'], ['/toolkit/sentence-packs', 'packs'], ['/toolkit/sentence-packs/meetings', 'meetings'],
    ['/toolkit/think-in-english', 'think'], ['/toolkit/think-in-english/thinking-in-blocks', 'blocks'],
  ];
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 1440, height: 900 }, { width: 820, height: 1180 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const [path, name] of routes) {
      await open(path);
      await page.evaluate(async () => { await document.fonts.ready; });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} overflows at ${viewport.width}`);
      assert.equal(await page.locator('.platform-hero > h1, .toolkit-heading > h1').count(), 1);
      await page.screenshot({ path: `output/playwright/toolkit-${name}-${viewport.width}.png`, fullPage: true });
    }
  }
  assert.equal(await storage(), before, 'Toolkit/home must leave existing course storage byte-for-byte unchanged');
  assert.deepEqual(errors, []);
  await context.close();
  console.log('OK Toolkit: registries, all 20 resource routes, combined URL filters/history, empty/reset states, keyboard navigation, no progress writes, not-found states, responsive pages');
});
