import type { ToolkitCategory, ToolkitCategoryId } from './toolkitTypes';
import { getToolkitResourceCount, toolkitCategories } from './toolkitRegistry';
import { toolkitCategoryPath, toolkitResourcePath } from './toolkitRoutes';
import type { SentencePack } from './sentencePacks/sentencePackTypes';
import { getSentencePackLevelLabel, getSentencePackTopicLabel } from './sentencePacks/sentencePackRegistry';
import type { ThinkInEnglishResource } from './thinkInEnglish/thinkInEnglishTypes';
import { getThinkCategoryLabel } from './thinkInEnglish/thinkInEnglishRegistry';
import './toolkit.css';

export function ToolkitBreadcrumb({ category, title }: { category?: ToolkitCategoryId; title?: string }) {
  const metadata = toolkitCategories.find((item) => item.id === category);
  return <nav className="platform-breadcrumb toolkit-breadcrumb" aria-label="Хлебные крошки">
    <a href="/">Visual English</a><span aria-hidden="true">/</span>
    {category ? <><a href="/toolkit">Больше практики</a><span aria-hidden="true">/</span>{title ? <><a href={toolkitCategoryPath(category)}>{metadata?.title}</a><span aria-hidden="true">/</span><span aria-current="page">{title}</span></> : <span aria-current="page">{metadata?.title}</span>}</> : <span aria-current="page">English Toolkit</span>}
  </nav>;
}

export function ThoughtModel({ blocks }: { blocks: readonly string[] }) {
  return <div className="thought-model">{blocks.map((block, index) => <span className="thought-model__step" key={`${index}-${block}`}>{index > 0 && <span className="thought-model__arrow" aria-hidden="true">→</span>}<span className="thought-model__block">{block}</span></span>)}</div>;
}

function ToolkitCategoryCard({ category, headingLevel }: { category: ToolkitCategory; headingLevel: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return <article className="toolkit-category" data-toolkit-category={category.id}>
    <div className="toolkit-category__preview" aria-hidden="true">{category.id === 'sentence-packs' ? <div className="pattern-chips">{category.preview.map((pattern) => <span key={pattern}>{pattern}</span>)}</div> : <ThoughtModel blocks={category.preview} />}</div>
    <div className="toolkit-category__body"><span className="toolkit-count">{getToolkitResourceCount(category.id)} {category.countLabel}</span><Heading>{category.title}</Heading><p className="toolkit-category__subtitle">{category.subtitle}</p><p>{category.description}</p><a className="toolkit-card-link" href={toolkitCategoryPath(category.id)}>{category.action} →</a></div>
  </article>;
}

export function ToolkitCategories({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  return <div className="toolkit-category-grid">{toolkitCategories.map((category) => <ToolkitCategoryCard key={category.id} category={category} headingLevel={headingLevel} />)}</div>;
}

export function HomeToolkitSection() {
  return <section className="home-toolkit" aria-labelledby="home-toolkit-title"><div className="platform-section-heading"><div><h2 id="home-toolkit-title">Больше практики</h2><p>Используй готовые конструкции и учись понимать внутреннюю логику английского.</p></div><a className="toolkit-overview-link" href="/toolkit">Весь Toolkit →</a></div><ToolkitCategories headingLevel="h3" /></section>;
}

export function SentencePackBadges({ pack }: { pack: SentencePack }) {
  return <div className="toolkit-badges"><span className="toolkit-badge toolkit-badge--accent">{getSentencePackLevelLabel(pack.level)}</span><span className="toolkit-badge">{getSentencePackTopicLabel(pack.topic)}</span></div>;
}

export function SentencePackCard({ pack }: { pack: SentencePack }) {
  return <article className="toolkit-resource-card" data-toolkit-category="sentence-packs" data-resource-slug={pack.slug}>
    <SentencePackBadges pack={pack} /><h2>{pack.title}</h2><p>{pack.description}</p><div className="resource-pattern" aria-hidden="true">{pack.sample.pattern}</div>
    {(pack.sentenceCount !== undefined || pack.patternCount !== undefined) && <p className="resource-meta">{pack.sentenceCount !== undefined && <span>{pack.sentenceCount} фраз</span>}{pack.patternCount !== undefined && <span>{pack.patternCount} конструкций</span>}</p>}
    {pack.status === 'available' ? <a className="toolkit-card-link" href={toolkitResourcePath('sentence-packs', pack.slug)} aria-label={`Открыть ${pack.title}`}>Открыть →</a> : <span className="toolkit-count">Скоро</span>}
  </article>;
}

export function ThinkInEnglishCard({ resource }: { resource: ThinkInEnglishResource }) {
  return <article className="toolkit-resource-card" data-toolkit-category="think-in-english" data-resource-slug={resource.slug}>
    <div className="toolkit-badges"><span className="toolkit-badge toolkit-badge--accent">{getThinkCategoryLabel(resource.category)}</span>{resource.beginnerFriendly && <span className="toolkit-badge">Для начинающих</span>}</div>
    <h2>{resource.title}</h2><p>{resource.description}</p><div className="resource-model" aria-hidden="true"><ThoughtModel blocks={resource.sample.model} /></div>
    {resource.status === 'available' ? <a className="toolkit-card-link" href={toolkitResourcePath('think-in-english', resource.slug)} aria-label={`Понять идею: ${resource.title}`}>Понять идею →</a> : <span className="toolkit-count">Скоро</span>}
  </article>;
}

export function FilterGroup({ label, options, value, onChange }: { label: string; options: readonly { id: string; label: string }[]; value: string | null; onChange: (value: string | null) => void }) {
  return <fieldset className="toolkit-filter"><legend>{label}</legend><div className="toolkit-filter__options">{[{ id: '', label: 'Все' }, ...options].map((option) => <button type="button" key={option.id} aria-pressed={(value ?? '') === option.id} onClick={() => onChange(option.id || null)}>{option.label}</button>)}</div></fieldset>;
}

export function EmptyToolkitResults({ onReset, packs = false }: { onReset: () => void; packs?: boolean }) {
  return <div className="toolkit-empty" role="status"><h2>{packs ? 'По этим фильтрам пока нет наборов.' : 'По этим фильтрам пока нет материалов.'}</h2><p>Попробуй другой вариант или посмотри всю библиотеку.</p><button className="button" onClick={onReset}>Сбросить фильтры</button></div>;
}
