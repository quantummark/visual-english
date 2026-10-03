import { Fragment } from 'react';
import { A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, MistakeBox, PracticeBox, FlowArrow } from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card07ConnectingIdeas.module.css';

const ideaSteps = [
  { label: 'МЫСЛЬ', english: 'I like the idea.' },
  { label: 'ПОЧЕМУ', english: "because it's simple." },
  { label: 'ПРИМЕР', english: 'For example, users can finish faster.' },
  { label: 'ДРУГАЯ СТОРОНА', english: 'However, it may cost more.' },
  { label: 'ВЫВОД', english: "Overall, I think it's worth trying." },
] as const;

const connectors = [
  { label: 'ДОБАВИТЬ', english: 'and', meaning: 'и / ещё мысль' },
  { label: 'ПРИЧИНА', english: 'because', meaning: 'потому что' },
  { label: 'РЕЗУЛЬТАТ', english: "so / that's why", meaning: 'поэтому' },
  { label: 'КОНТРАСТ', english: 'but / however', meaning: 'но / однако' },
  { label: 'ПРИМЕР', english: 'for example', meaning: 'например' },
] as const;

export function Card07ConnectingIdeas() {
  const card = getCourseCard(7)!;
  return (
    <A4Page cardId={card.id} accent={card.accent} className={styles.ideasPage}>
      <CourseHeader card={card} secondaryLabel="Основано на Block 05 — Connecting Ideas" />
      <div className={`page-content ${styles.content}`}>
        <MainIdeaBox>
          <strong>Не пытайся сразу строить длинное предложение.</strong>
          <p>Скажи одну простую мысль, а потом добавляй к ней смысл шаг за шагом.</p>
        </MainIdeaBox>

        <section className={styles.mainFlow} aria-label="Пять шагов: от мысли до связного ответа">
          <ol className={styles.steps}>
            {ideaSteps.map(({ label, english }, index) => <Fragment key={label}>
              <li className={styles.step}><span className={styles.stepNumber}>{index + 1}</span><strong>{label}</strong><p lang="en">{english}</p></li>
              {index < ideaSteps.length - 1 && <li className={styles.transition} aria-hidden="true"><FlowArrow direction="down" /></li>}
            </Fragment>)}
          </ol>
          <div className={styles.spokenAnswer}>
            <h2>Так звучит связный ответ</h2>
            <div className={styles.paragraph} lang="en">
              <p>I like the idea <b>because</b> it's simple.</p>
              <p><b>For example,</b> users can finish faster.</p>
              <p><b>However,</b> it may cost more.</p>
              <p><b>Overall,</b> I think it's worth trying.</p>
            </div>
            <p className={styles.note}>Мы добавляли простые мысли по очереди.</p>
            <p className={styles.topicRule}>Одна тема: 3–5 фраз, по мысли в каждой.</p>
            <div className={styles.thatsWhy}>
              <p className={styles.english} lang="en">I was tired.<br /><b>That's why</b> I went home early.</p>
              <p className={styles.note}>Поэтому — между предложениями.</p>
            </div>
          </div>
        </section>

        <div className={styles.connectors} aria-label="Пять смысловых групп связок">
          {connectors.map(({ label, english, meaning }) => <div key={label}><strong>{label}</strong><p lang="en">{english}</p><span>{meaning}</span></div>)}
        </div>

        <Section title="Короткий ответ → развёрнутый ответ" className={styles.expansion}>
          <div className={styles.expandedGrid}>
            <div className={styles.shortAnswer}><p lang="en">I like remote work.</p><p className={styles.note}>Не длиннее ради длины.<br />Больше понятного смысла.</p></div>
            <FlowArrow />
            <div className={styles.expandedAnswer} lang="en"><p>I like remote work <b>because</b> it's flexible.</p><p><b>For example,</b> I can organize my day better.</p><p><b>However,</b> communication can be harder.</p></div>
          </div>
        </Section>

        <div className={styles.details}>
          <Section title="Причина ↔ результат" className={styles.detailCard}>
            <p className={styles.english} lang="en">I stayed home <b>because</b> I was tired.</p>
            <p className={styles.note}>Остался дома, потому что устал.</p>
            <p className={`${styles.english} ${styles.nextExample}`} lang="en">I was tired, <b>so</b> I stayed home.</p>
            <p className={styles.note}>Устал → поэтому остался дома.</p>
          </Section>
          <Section title="Другая сторона" className={styles.detailCard}>
            <p className={styles.english} lang="en">I like the idea, <b>but</b> it's expensive.</p>
            <p className={`${styles.english} ${styles.nextExample}`} lang="en">I like the idea.<br /><b>However,</b> it's expensive.</p>
            <p className={styles.note}><span lang="en">but</span> — внутри мысли;<br /><span lang="en">however</span> — следующая мысль.</p>
          </Section>
          <Section title="Если или когда?" className={styles.detailCard}>
            <p className={styles.english} lang="en"><b>If</b> she calls, I'll tell her.</p>
            <p className={styles.note}>Не знаем, будет ли звонок.</p>
            <p className={`${styles.english} ${styles.nextExample}`} lang="en"><b>When</b> she calls, I'll tell her.</p>
            <p className={styles.note}>Ожидаем звонка.</p>
          </Section>
        </div>

        <div className={styles.twoColumns}>
          <Section title="Хотя: не добавляй второй «но»" className={styles.mistake}>
            <MistakeBox wrong="Although it's expensive, but I like it." correct="Although it's expensive, I like it." explanation="Хотя это дорого, мне это нравится. После although — без but." />
          </Section>
          <Section title="Попробуй сам" className={styles.practice}>
            <PracticeBox question="Соедини две мысли:">
              <p className={styles.practicePieces} lang="en">I like the idea. <span>+</span> It's simple.</p>
              <p className={styles.answer} lang="en">I like the idea because it's simple.</p>
              <p className={styles.note}>Мне нравится идея, потому что она простая.</p>
            </PracticeBox>
          </Section>
        </div>

        <aside className={styles.takeaway} aria-label="Главный вывод">
          <div className={styles.takeawayHeading}><strong>Не строй одно огромное предложение.</strong><p>B2 — ясная связь между идеями.</p></div>
          <div className={styles.opinionFlow}>
            {[
              ['МЫСЛЬ', 'I think...'], ['ПРИЧИНА', 'because...'], ['ПРИМЕР', 'for example...'], ['КОНТРАСТ', 'however...'], ['ВЫВОД', 'overall...'],
            ].map(([label, english], index) => <Fragment key={label}>{index > 0 && <FlowArrow />}<div><strong>{label}</strong><span lang="en">{english}</span></div></Fragment>)}
          </div>
        </aside>
      </div>
      <CourseFooter card={card} previousLabel="Могу / хочу / нужно / стоит" nextLabel="Предлоги и готовые фразы" />
    </A4Page>
  );
}
