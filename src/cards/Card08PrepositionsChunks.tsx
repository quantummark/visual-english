import { A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, ComparisonBlock, MistakeBox, PracticeBox, FlowArrow } from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card08PrepositionsChunks.module.css';

type Relation = 'in' | 'on' | 'at' | 'to' | 'from';

function RelationDiagram({ relation }: { relation: Relation }) {
  return <svg viewBox="0 0 110 54" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {relation === 'in' && <><rect className={styles.area} x="22" y="7" width="66" height="40" rx="7" /><circle className={styles.object} cx="55" cy="27" r="6" /></>}
    {relation === 'on' && <><path d="M17 32h76M25 32v14m60-14v14" /><rect className={styles.object} x="46" y="16" width="18" height="16" rx="3" /></>}
    {relation === 'at' && <><path className={styles.guide} d="M18 27h74M55 7v40" /><circle cx="55" cy="27" r="13" /><circle className={styles.object} cx="55" cy="27" r="5" /></>}
    {relation === 'to' && <><rect className={styles.area} x="77" y="13" width="23" height="28" rx="4" /><circle className={styles.object} cx="16" cy="27" r="4" /><path d="M25 27h55m-8-7 8 7-8 7" /></>}
    {relation === 'from' && <><rect className={styles.area} x="10" y="13" width="23" height="28" rx="4" /><circle className={styles.object} cx="21" cy="27" r="4" /><path d="M37 27h58m-8-7 8 7-8 7" /></>}
  </svg>;
}

function Chunks({ phrases }: { phrases: readonly string[] }) {
  return <ul className={styles.chunks} lang="en">{phrases.map(phrase => <li key={phrase}>{phrase}</li>)}</ul>;
}

const relationships: readonly { relation: Relation; meaning: string; examples: readonly string[] }[] = [
  { relation: 'in', meaning: 'внутри / область', examples: ['in the room', 'in Kyiv'] },
  { relation: 'on', meaning: 'на поверхности', examples: ['on the table', 'on the screen'] },
  { relation: 'at', meaning: 'точка / место', examples: ['at home', 'at work'] },
  { relation: 'to', meaning: 'движение к', examples: ['go to work', 'send it to me'] },
  { relation: 'from', meaning: 'источник', examples: ['from Ukraine', 'from work'] },
];

export function Card08PrepositionsChunks() {
  const card = getCourseCard(8)!;
  return (
    <A4Page cardId={card.id} accent={card.accent} className={styles.chunksPage}>
      <CourseHeader card={card} secondaryLabel="Основано на Block 06 — Prepositions & Chunks" />
      <div className={`page-content ${styles.content}`}>
        <MainIdeaBox>
          <strong>Предлог редко стоит сам по себе.</strong>
          <p>Он либо показывает отношение, либо является частью готовой фразы.</p>
        </MainIdeaBox>

        <section className={styles.relationshipMap} aria-label="Пять отношений: внутри, поверхность, точка, направление, источник">
          <div className={styles.relationships}>
            {relationships.map(({ relation, meaning, examples }) => <div className={styles.relation} key={relation}>
              <h2 lang="en">{relation.toUpperCase()}</h2>
              <RelationDiagram relation={relation} />
              <p className={styles.meaning}>{meaning}</p>
              <div className={styles.relationExamples} lang="en">{examples.map(example => <p key={example}>{example}</p>)}</div>
            </div>)}
          </div>
          <p className={styles.note}>Не ищи один постоянный перевод для предлога. Смотри на отношение.</p>
        </section>

        <Section title="А если говорим о времени?" className={styles.timeMap}>
          <div className={styles.threeColumns}>
            <p><strong><span lang="en">at</span> — точное время</strong><span lang="en">at 5 PM · at noon</span></p>
            <p><strong><span lang="en">on</span> — день / дата</strong><span lang="en">on Monday · on October 5</span></p>
            <p><strong><span lang="en">in</span> — большой период</strong><span lang="en">in October · in 2026</span></p>
          </div>
        </Section>

        <Section title="Учи как одно целое">
          <div className={styles.chunkAnchor}><span>Не по одному слову: <span lang="en">depend + on</span></span><FlowArrow /><strong lang="en">depend on</strong><span>один готовый блок</span></div>
          <div className={styles.phraseGroups}>
            <div className={styles.phraseGroup}><h3>Что делаем</h3><Chunks phrases={['wait for', 'listen to', 'depend on', 'work on', 'talk about', 'agree with']} /></div>
            <div className={styles.phraseGroup}><h3>Какой / что чувствую</h3><Chunks phrases={['interested in', 'good at', 'responsible for', 'afraid of']} /></div>
            <div className={styles.phraseGroup}><h3>О чём говорим</h3><Chunks phrases={['reason for', 'solution to', 'problem with', 'access to']} /></div>
          </div>
        </Section>

        <section aria-label="Один глагол — разные отношения">
          <ComparisonBlock leftLabel="work on — над чем-то" rightLabel="work with — с кем-то / чем-то"
            left={<p className={styles.english} lang="en">I work on the project.</p>}
            right={<p className={styles.english} lang="en">I work with developers.</p>}
          />
          <p className={styles.note}>Один глагол может менять смысл вместе с предлогом.</p>
        </section>

        <Section title="Готовые блоки речи">
          <Chunks phrases={['at the moment', 'by the way', 'in charge of', 'on purpose', 'in general', 'for example']} />
          <p className={styles.note}>Не разбирай каждое слово. Запоминай выражение целиком.</p>
        </Section>

        <div className={styles.threeColumns}>
          <Section title="Учим вместе">
            <MistakeBox wrong="depend from" correct="depend on" explanation="Одна готовая фраза." />
          </Section>
          <Section title="Не теряем связку">
            <MistakeBox wrong="listen music" correct="listen to music" explanation="listen to — одна связка." />
          </Section>
          <Section title="Попробуй сам">
            <PracticeBox question="Выбери: in · on · at">
              <p className={styles.practiceBase} lang="en">interested ___ design</p>
              <p className={styles.answer} lang="en">✓ interested in design</p>
              <p className={styles.note}>Интересоваться дизайном.</p>
            </PracticeBox>
          </Section>
        </div>

        <aside className={styles.takeaway} aria-label="Главный вывод">
          <div className={styles.takeawayHeading}><strong>Не учи предлог отдельно.</strong><p>Запоминай смысл или весь блок целиком.</p></div>
          <div className={styles.twoPaths}>
            <div><strong>ОТНОШЕНИЕ</strong><p lang="en">in the room · on the table · at work</p></div>
            <span>или</span>
            <div><strong>ГОТОВАЯ ФРАЗА</strong><p lang="en">depend on · listen to · interested in</p></div>
          </div>
        </aside>
      </div>
      <CourseFooter card={card} previousLabel="Как соединять мысли" nextLabel="a / an / the / ничего" />
    </A4Page>
  );
}
