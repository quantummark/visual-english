import { chromium } from 'playwright';
import type { Browser } from 'playwright';
import { createServer } from 'vite';
import type { ViteDevServer } from 'vite';

/** Use an explicit existing app, or start a local Vite server and always clean up. */
export async function withCourseBrowser(work: (browser: Browser, baseURL: string) => Promise<void>) {
  let server: ViteDevServer | undefined;
  let browser: Browser | undefined;
  try {
    let baseURL = process.env.EXPORT_BASE_URL;
    if (baseURL) {
      const response = await fetch(baseURL);
      if (!response.ok) throw new Error(`App unavailable at ${baseURL}: HTTP ${response.status}`);
    } else {
      server = await createServer({ server: { host: '127.0.0.1', port: 4173, open: false }, clearScreen: false });
      await server.listen();
      baseURL = server.resolvedUrls?.local[0];
    }
    if (!baseURL) throw new Error('Could not resolve local app URL.');
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE });
    await work(browser, baseURL);
  } finally {
    await browser?.close();
    await server?.close();
  }
}
