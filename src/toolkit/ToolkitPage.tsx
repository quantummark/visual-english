import { PlatformLayout } from '../platform/PlatformLayout';
import { SentencePackLibrary, ThinkInEnglishLibrary, ToolkitOverview } from './ToolkitLibraries';
import { SentencePackPage, ThinkInEnglishPage } from './ToolkitResourcePages';
import type { ToolkitRoute } from './toolkitRoutes';

export function ToolkitPage({ route, location }: { route: ToolkitRoute; location: URL }) {
  switch (route.kind) {
    case 'overview': return <ToolkitOverview />;
    case 'sentence-library': return <SentencePackLibrary location={location} />;
    case 'think-library': return <ThinkInEnglishLibrary location={location} />;
    case 'sentence-pack': return <SentencePackPage pack={route.resource} />;
    case 'think-resource': return <ThinkInEnglishPage resource={route.resource} />;
    case 'not-found': return <PlatformLayout><div className="toolkit-heading toolkit-not-found"><h1>Материал не найден</h1><p>Этот адрес не ведёт к доступному материалу. Выбери другой в библиотеке.</p><a className="button" href={route.backPath}>← Вернуться к библиотеке</a></div></PlatformLayout>;
  }
}
