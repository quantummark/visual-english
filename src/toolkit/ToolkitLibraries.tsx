import { navigate } from '../app/navigation';
import { PlatformLayout } from '../platform/PlatformLayout';
import { EmptyToolkitResults, FilterGroup, SentencePackCard, ThinkInEnglishCard, ToolkitBreadcrumb, ToolkitCategories } from './ToolkitComponents';
import { filterSentencePacks, sentencePackLevels, sentencePackTopics } from './sentencePacks/sentencePackRegistry';
import { filterThinkResources, thinkInEnglishCategories } from './thinkInEnglish/thinkInEnglishRegistry';

// Filters live in the URL, so direct links, refresh and browser history keep their state.
function updateFilter(location: URL, name: string, value: string | null) {
  const next = new URL(location.href);
  if (value) next.searchParams.set(name, value);
  else next.searchParams.delete(name);
  navigate(`${next.pathname}${next.search}${next.hash}`);
}

export function ToolkitOverview() {
  return <PlatformLayout><ToolkitBreadcrumb /><header className="toolkit-heading"><span className="platform-eyebrow">English Toolkit</span><h1>Больше практики</h1><p>Готовые конструкции для речи и понятные модели, которые помогают думать по-английски.</p><p className="toolkit-heading__support">Выбирай материал под свою задачу и открывай в любом порядке.</p></header><section className="toolkit-overview-categories" aria-label="Разделы English Toolkit"><ToolkitCategories /></section></PlatformLayout>;
}

export function SentencePackLibrary({ location }: { location: URL }) {
  const rawLevel = location.searchParams.get('level');
  const rawTopic = location.searchParams.get('topic');
  const level = sentencePackLevels.some((option) => option.id === rawLevel) ? rawLevel : null;
  const topic = sentencePackTopics.some((option) => option.id === rawTopic) ? rawTopic : null;
  const packs = filterSentencePacks(level, topic);
  const reset = () => { const next = new URL(location.href); next.searchParams.delete('level'); next.searchParams.delete('topic'); navigate(`${next.pathname}${next.search}${next.hash}`); };
  return <PlatformLayout><div className="toolkit-library" data-toolkit-category="sentence-packs"><ToolkitBreadcrumb category="sentence-packs" /><header className="toolkit-heading"><span className="platform-eyebrow">English Toolkit · Готовые конструкции</span><h1>Sentence Packs</h1><p>Готовые конструкции для реальных ситуаций.</p><p className="toolkit-heading__support">Учи не отдельные слова, а фразы и шаблоны, которые можно сразу использовать в разговоре.</p></header>
    <section className="toolkit-filters" aria-label="Фильтры наборов"><FilterGroup label="Уровень" options={sentencePackLevels} value={level} onChange={(value) => updateFilter(location, 'level', value)} /><FilterGroup label="Тема" options={sentencePackTopics} value={topic} onChange={(value) => updateFilter(location, 'topic', value)} /></section>
    <div className="toolkit-results"><p role="status" aria-live="polite">Найдено наборов: {packs.length}</p>{(level || topic) && <button onClick={reset}>Сбросить</button>}</div>
    {packs.length ? <section className="toolkit-resource-grid" aria-label="Наборы фраз">{packs.map((pack) => <SentencePackCard key={pack.id} pack={pack} />)}</section> : <EmptyToolkitResults packs onReset={reset} />}
  </div></PlatformLayout>;
}

export function ThinkInEnglishLibrary({ location }: { location: URL }) {
  const rawCategory = location.searchParams.get('category');
  const category = thinkInEnglishCategories.some((option) => option.id === rawCategory) ? rawCategory : null;
  const resources = filterThinkResources(category);
  const reset = () => updateFilter(location, 'category', null);
  return <PlatformLayout><div className="toolkit-library" data-toolkit-category="think-in-english"><ToolkitBreadcrumb category="think-in-english" /><header className="toolkit-heading"><span className="platform-eyebrow">English Toolkit · Логика языка</span><h1>Think in English</h1><p>Пойми не только правила, а то, как английский организует мысль.</p><p className="toolkit-heading__support">Эти материалы помогают меньше переводить с русского и быстрее понимать внутреннюю логику языка.</p></header>
    <section className="toolkit-filters" aria-label="Фильтры материалов"><FilterGroup label="Категория" options={thinkInEnglishCategories} value={category} onChange={(value) => updateFilter(location, 'category', value)} /></section>
    <div className="toolkit-results"><p role="status" aria-live="polite">Найдено материалов: {resources.length}</p>{category && <button onClick={reset}>Сбросить</button>}</div>
    {resources.length ? <section className="toolkit-resource-grid" aria-label="Материалы о логике языка">{resources.map((resource) => <ThinkInEnglishCard key={resource.id} resource={resource} />)}</section> : <EmptyToolkitResults onReset={reset} />}
  </div></PlatformLayout>;
}
