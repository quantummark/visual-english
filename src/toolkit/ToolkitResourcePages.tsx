import { PlatformLayout } from '../platform/PlatformLayout';
import { SentencePackBadges, ThoughtModel, ToolkitBreadcrumb } from './ToolkitComponents';
import type { SentencePack } from './sentencePacks/sentencePackTypes';
import type { ThinkInEnglishResource } from './thinkInEnglish/thinkInEnglishTypes';
import { getThinkCategoryLabel } from './thinkInEnglish/thinkInEnglishRegistry';

function TemplateNotice() {
  return <p className="toolkit-template-notice">Предварительная структура материала. Пока здесь короткие примеры; полный материал появится позже.</p>;
}

export function SentencePackPage({ pack }: { pack: SentencePack }) {
  return <PlatformLayout><article className="toolkit-article" data-toolkit-category="sentence-packs"><ToolkitBreadcrumb category="sentence-packs" title={pack.title} /><header className="toolkit-heading"><SentencePackBadges pack={pack} /><h1>{pack.title}</h1><p>{pack.description}</p></header><TemplateNotice />
    <section className="toolkit-content-section toolkit-content-section--lead"><span className="toolkit-section-number">01</span><h2>Core Patterns</h2><p>Каркас фразы: оставь конструкцию и добавь свой смысл.</p><div className="toolkit-example toolkit-example--pattern">{pack.sample.pattern}</div></section>
    <section className="toolkit-content-section"><span className="toolkit-section-number">02</span><h2>Ready Sentences</h2><p>Один пример того, как конструкция звучит в разговоре.</p><div className="toolkit-example">{pack.sample.sentence}</div></section>
    <div className="toolkit-stub-grid">
      <section className="toolkit-content-section"><span className="toolkit-section-number">03</span><h2>Change the Pattern</h2><p>Здесь появятся варианты с другим действием, предметом или ситуацией.</p></section>
      <section className="toolkit-content-section"><span className="toolkit-section-number">04</span><h2>Mini Dialogue</h2><p>Здесь появится короткий диалог, который связывает конструкции в живую речь.</p></section>
      <section className="toolkit-content-section"><span className="toolkit-section-number">05</span><h2>Practice</h2><p>Здесь появятся задания, чтобы применить фразы к своей ситуации.</p></section>
    </div><a className="button toolkit-back" href="/toolkit/sentence-packs">← Все Sentence Packs</a>
  </article></PlatformLayout>;
}

export function ThinkInEnglishPage({ resource }: { resource: ThinkInEnglishResource }) {
  return <PlatformLayout><article className="toolkit-article toolkit-article--think" data-toolkit-category="think-in-english"><ToolkitBreadcrumb category="think-in-english" title={resource.title} /><header className="toolkit-heading"><div className="toolkit-badges"><span className="toolkit-badge toolkit-badge--accent">{getThinkCategoryLabel(resource.category)}</span>{resource.beginnerFriendly && <span className="toolkit-badge">Для начинающих</span>}</div><h1>{resource.title}</h1><p>{resource.description}</p></header><TemplateNotice />
    <section className="toolkit-content-section toolkit-content-section--lead"><h2>Главная идея</h2><p>{resource.description}</p><div className="toolkit-big-model"><ThoughtModel blocks={resource.sample.model} /></div></section>
    <section className="toolkit-content-section"><h2>Русская и английская мысль</h2><div className="toolkit-comparison"><div><h3>Привычный путь</h3><p>Сначала русская фраза → перевод каждого слова.</p></div><div><h3>Новая привычка</h3><p>Сначала смысл → подходящая английская модель.</p></div></div><p className="toolkit-stub-note">Подробное сравнение для этой темы появится в полной версии.</p></section>
    <section className="toolkit-content-section"><h2>Примеры модели</h2><div className="toolkit-example-list">{resource.sample.examples.map((example) => <p className="toolkit-example" key={example}>{example}</p>)}</div></section>
    <div className="toolkit-stub-grid">
      <section className="toolkit-content-section"><h2>Частая ошибка</h2><p>Здесь разберём типичную ошибку и покажем, как её исправить.</p></section>
      <section className="toolkit-content-section"><h2>Как перестроить привычку</h2><p>Здесь появятся простые шаги, чтобы применять модель в своей речи.</p></section>
      <section className="toolkit-content-section"><h2>Мини-практика</h2><p>Здесь появится короткое задание для самостоятельной тренировки.</p></section>
    </div><section className="toolkit-content-section toolkit-takeaway"><h2>Главный вывод</h2><p>Здесь закрепим ключевую мысль материала одной короткой формулировкой.</p></section><a className="button toolkit-back" href="/toolkit/think-in-english">← Все Think in English</a>
  </article></PlatformLayout>;
}
