import assert from 'node:assert/strict';
import type { Page } from 'playwright';

export async function waitForCourse(page: Page) {
  await page.locator('[data-a4-page]').first().waitFor();
  await page.evaluate(async () => { await document.fonts.ready; });
}

export async function assertPageQuality(page: Page, expectedCount: number) {
  assert.equal(await page.locator('[data-a4-page]').count(), expectedCount, 'Unexpected A4 page count');
  const failures = await page.locator('[data-a4-page]').evaluateAll((pages) => pages.flatMap((element) => {
    const page = element as HTMLElement;
    const issues: string[] = [];
    const rect = page.getBoundingClientRect();
    const content = page.querySelector<HTMLElement>('.page-content');
    const footer = page.querySelector<HTMLElement>('.course-footer');
    if (Math.abs(rect.width / rect.height - 210 / 297) > .001) issues.push('Wrong A4 ratio');
    if (page.scrollHeight > page.clientHeight + 1 || page.scrollWidth > page.clientWidth + 1) issues.push('Page overflow');
    if (content && content.scrollHeight > content.clientHeight + 1) issues.push('Content overflow into footer');
    if (content && footer) {
      const footerTop = footer.getBoundingClientRect().top;
      for (const child of content.children) {
        if (child.getBoundingClientRect().bottom > footerTop) issues.push('Content overlaps footer');
      }
    }
    for (const text of page.querySelectorAll<HTMLElement>('h1, h2, h3, p, .course-footer')) {
      const box = text.getBoundingClientRect();
      if (box.left < rect.left - 1 || box.right > rect.right + 1 || box.bottom > rect.bottom + 1) issues.push('Text outside page');
    }
    return issues.map((issue) => `Card ${page.dataset.cardId}: ${issue}`);
  }));
  assert.deepEqual(failures, [], failures.join('\n'));
}
