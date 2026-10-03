import {
  A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section,
  ComparisonBlock, MistakeBox, PracticeBox, FlowArrow,
} from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card06AbilityWantNeedAdvice.module.css';

const intentions = [
  { label: 'МОГУ', english: 'I can do it.', side: 'left' },
  { label: 'ХОЧУ', english: 'I want to do it.', side: 'left' },
  { label: 'НУЖНО', english: 'I need to do it.', side: 'left' },
  { label: 'ПРИХОДИТСЯ / ОБЯЗАН', english: 'I have to do it.', side: 'right' },
  { label: 'СТОИТ', english: 'You should do it.', side: 'right' },
  { label: 'ВОЗМОЖНО', english: 'It might work.', side: 'right' },
] as const;

export function Card06AbilityWantNeedAdvice() {
  const card = getCourseCard(6)!;
  return (
    <A4Page cardId={card.id} accent={card.accent} className={styles.intentionPage}>
      <CourseHeader card={card} secondaryLabel="Основано на Block 04 — Can / Want / Need / Should" />
      <div className={`page-content ${styles.content}`}>
        <MainIdeaBox>
          <strong>Одна и та же идея может звучать по-разному.</strong>
          <p>Сначала реши, что ты хочешь выразить: могу, хочу, нужно, стоит или возможно.</p>
        </MainIdeaBox>

        <section className={styles.intentionMap} aria-label="Одна идея — шесть намерений">
          <svg className={styles.branches} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path d="M31 16.5 40 50 31 83.5M31 50h9M69 16.5 60 50 69 83.5M60 50h9" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className={styles.hub}><strong>СДЕЛАТЬ ЭТО</strong><span>НАМЕРЕНИЕ<br />↓<br />КОНСТРУКЦИЯ</span></div>
          {intentions.map(({ label, english, side }, index) => <div key={label} className={styles.mapNode} style={{ gridColumn: side === 'left' ? 1 : 3, gridRow: index % 3 + 1 }}>
            <strong>{label}</strong><p lang="en">{english}</p>
          </div>)}
        </section>

        <div className={styles.threeColumns}>
          <Section title="Когда говорим «могу»" className={styles.meaningCard}>
            <p className={styles.pattern}><strong lang="en">can + действие</strong><span lang="en">can help · can work · can call</span></p>
            <p className={styles.note}><span lang="en">can</span> — могу сейчас / вообще.<br /><span lang="en">could</span> — мог / мог бы.</p>
          </Section>
          <Section title="Когда говорим «хочу»" className={styles.meaningCard}>
            <p className={styles.english} lang="en">I want to talk.</p>
            <p className={styles.note}>Хочу поговорить — прямо.</p>
            <div className={styles.softening}><FlowArrow direction="down" /><span>мягче</span></div>
            <p className={styles.english} lang="en">I'd like to talk.</p>
            <p className={styles.note}>Хотел бы — мягче и вежливее.</p>
          </Section>
          <Section title="Когда говорим «нужно»" className={styles.meaningCard}>
            <p className={styles.english} lang="en">I need to finish this today.</p>
            <p className={styles.note}>Мне это нужно.</p>
            <p className={`${styles.english} ${styles.secondExample}`} lang="en">I have to finish this today.</p>
            <p className={styles.note}>Обязанность или обстоятельства.</p>
          </Section>
        </div>

        <Section title="Не обязательно ≠ нельзя" className={styles.importantContrast}>
          <ComparisonBlock leftLabel="НЕ ОБЯЗАТЕЛЬНО" rightLabel="НЕЛЬЗЯ"
            left={<><p className={styles.english} lang="en">You don't have to do it.</p><p className={styles.note}>Тебе не обязательно это делать.</p><p className={styles.note}>Можно сделать, можно не делать.</p></>}
            right={<><p className={styles.english} lang="en">You mustn't do it.</p><p className={styles.note}>Тебе нельзя это делать.</p><p className={styles.note}>Это запрещено.</p></>}
          />
        </Section>

        <div className={styles.threeColumns}>
          <Section title="Когда говорим «стоит»" className={styles.meaningCard}>
            <p className={styles.english} lang="en">You should rest.</p>
            <p className={styles.note}>Тебе стоит отдохнуть.</p>
            <p className={styles.note}>Совет / хорошая идея.</p>
          </Section>
          <Section title="Когда «возможно»" className={styles.meaningCard}>
            <p className={styles.note}><span lang="en">might</span> — возможно.</p>
            <p className={`${styles.english} ${styles.secondExample}`} lang="en">We could try another way.</p>
            <p className={styles.note}>Могли бы — возможный вариант.</p>
          </Section>
          <Section title="Как попросить мягче" className={`${styles.meaningCard} ${styles.requests}`}>
            <p className={styles.requestLine}><strong lang="en">Help me.</strong><span>Помоги.</span></p>
            <div className={styles.softening}><FlowArrow direction="down" /></div>
            <p className={styles.requestLine}><strong lang="en">Can you help me?</strong><span>Можешь?</span></p>
            <div className={styles.softening}><FlowArrow direction="down" /></div>
            <p className={styles.requestLine}><strong lang="en">Could you help me?</strong><span>Мягче.</span></p>
          </Section>
        </div>

        <div className={styles.twoColumns}>
          <Section title="Типичная ошибка">
            <MistakeBox wrong="I can to do it." correct="I can do it." explanation="can / could / should / might + простая форма." />
          </Section>
          <Section title="Попробуй сам" className={styles.practice}>
            <PracticeBox question="Тебе нужно закончить работу сегодня.">
              <p className={styles.practiceChoice}>Могу · хочу · <strong>✓ нужно</strong></p>
              <p className={styles.english} lang="en">I need to finish the work today.</p>
            </PracticeBox>
          </Section>
        </div>

        <aside className={styles.takeaway} aria-label="Главный вывод">
          <div className={styles.takeawayHeading}><strong>Сначала спроси: что я хочу выразить?</strong><p className={styles.note}>Сначала смысл → потом конструкция.</p></div>
          <div className={styles.summaryMap}>
            <p><b>МОГУ</b><span lang="en">can</span></p>
            <p><b>ХОЧУ</b><span lang="en">want to / would like to</span></p>
            <p><b>НУЖНО</b><span lang="en">need to / have to</span></p>
            <p><b>СТОИТ</b><span lang="en">should</span></p>
            <p><b>ВОЗМОЖНО</b><span lang="en">might / could</span></p>
          </div>
        </aside>
      </div>
      <CourseFooter card={card} previousLabel="Результат и длительность" nextLabel="Как соединять мысли" />
    </A4Page>
  );
}
