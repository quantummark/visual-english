import { getSentencePackBySlug } from './sentencePacks/sentencePackRegistry';
import type { SentencePack } from './sentencePacks/sentencePackTypes';
import { getThinkResourceBySlug } from './thinkInEnglish/thinkInEnglishRegistry';
import type { ThinkInEnglishResource } from './thinkInEnglish/thinkInEnglishTypes';
import type { ToolkitCategoryId } from './toolkitTypes';

export const toolkitCategoryPath = (category: ToolkitCategoryId) => `/toolkit/${category}`;
export const toolkitResourcePath = (category: ToolkitCategoryId, slug: string) => `${toolkitCategoryPath(category)}/${encodeURIComponent(slug)}`;

export type ToolkitRoute =
  | { kind: 'overview'; title: string }
  | { kind: 'sentence-library'; title: string }
  | { kind: 'think-library'; title: string }
  | { kind: 'sentence-pack'; title: string; resource: SentencePack }
  | { kind: 'think-resource'; title: string; resource: ThinkInEnglishResource }
  | { kind: 'not-found'; title: string; backPath: string };

export function resolveToolkitRoute(pathname: string): ToolkitRoute | undefined {
  const path = pathname.replace(/\/$/, '');
  if (path === '/toolkit') return { kind: 'overview', title: 'Больше практики' };
  if (path === '/toolkit/sentence-packs') return { kind: 'sentence-library', title: 'Sentence Packs' };
  if (path === '/toolkit/think-in-english') return { kind: 'think-library', title: 'Think in English' };
  if (!path.startsWith('/toolkit/')) return undefined;
  const match = /^\/toolkit\/(sentence-packs|think-in-english)\/([^/]+)$/.exec(path);
  if (match) {
    if (match[1] === 'sentence-packs') {
      const resource = getSentencePackBySlug(match[2]);
      if (resource?.status === 'available') return { kind: 'sentence-pack', title: resource.title, resource };
    } else {
      const resource = getThinkResourceBySlug(match[2]);
      if (resource?.status === 'available') return { kind: 'think-resource', title: resource.title, resource };
    }
  }
  const category = path.split('/')[2];
  const backPath = category === 'sentence-packs' || category === 'think-in-english' ? toolkitCategoryPath(category) : '/toolkit';
  return { kind: 'not-found', title: 'Материал не найден', backPath };
}
