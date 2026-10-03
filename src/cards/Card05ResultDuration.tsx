import {
  A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, ExampleCard,
  ComparisonBlock, MistakeBox, PracticeBox, FlowArrow, Timeline,
} from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card05ResultDuration.module.css';

type ViewKind = 'fact' | 'process' | 'result' | 'duration';

function ViewIcon({ kind }: { kind: ViewKind }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'fact' && <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="12" cy="12" r="4" /></>}
    {kind === 'process' && <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m10 9 5 3-5 3Z" /></>}
    {kind === 'result' && <><circle cx="12" cy="12" r="9" /><path d="m7 12 3 3 7-7" /></>}
    {kind === 'duration' && <><path d="M3 12h18m-4-4 4 4-4 4M3 8v8M8 10v4M13 10v4" /></>}
  </svg>;
}

const actionViews = [
  { kind: 'fact', label: 'ФАКТ', english: 'I work.' },
  { kind: 'process', label: 'ПРОЦЕСС', english: "I'm working." },
  { kind: 'result', label: 'РЕЗУЛЬТАТ', english: "I've finished." },
  { kind: 'duration', label: 'ДЛИТЕЛЬНОСТЬ', english: "I've been working for two hours." },
] as const;

function ActionViews({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.actionViews} ${compact ? styles.compactViews : ''}`}>
    {actionViews.map(({ kind, label, english }) => <div key={kind} className={styles[kind]}>
      <div className={styles.viewHeading}>{!compact && <ViewIcon kind={kind} />}<strong>{label}</strong></div>
      <p lang="en">{english}</p>
    </div>)}
  </div>;
}

export function Card05ResultDuration() {
  const card = getCourseCard(5)!;
  return (
    <A4Page cardId={card.id} accent={card.accent} className={styles.resultPage}>
      <CourseHeader card={card} secondaryLabel="Продолжение блока времени" />
      <div className={`page-content ${styles.content}`}>
        <MainIdeaBox>
          <strong>Одно действие можно увидеть по-разному.</strong>
          <p>Иногда важен результат. Иногда — сколько времени длился процесс.</p>
        </MainIdeaBox>

        <section aria-label="Четыре взгляда на действие"><ActionViews /></section>

        <div className={styles.twoColumns}>
          <Section title="Когда важен результат" className={styles.mainPanel}>
            <div className={styles.resultFlow}><span>действие раньше</span><FlowArrow /><strong><ViewIcon kind="result" /> результат сейчас</strong></div>
            <ExampleCard english="I've finished the work." explanation="Я закончил работу." />
            <p className={styles.note}>Работа уже закончена сейчас — важен результат.</p>
            <div className={styles.fileContrast}>
              <div><strong>Когда произошло</strong><p lang="en">I sent the file yesterday.</p><span>Вчера — точное время.</span></div>
              <div><strong>Результат сейчас</strong><p lang="en">I've sent the file.</p><span>Файл уже отправлен.</span></div>
            </div>
          </Section>
          <Section title="Когда важно, сколько это длится" className={styles.mainPanel}>
            <div className={styles.durationLine} role="img" aria-label="Длительность: от начала до сейчас">
              <div><span>НАЧАЛО</span><strong>СЕЙЧАС</strong></div>
              <svg viewBox="0 0 300 20" fill="none" aria-hidden="true"><path d="M6 10h284m-8-6 8 6-8 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6" cy="10" r="4" fill="currentColor" /></svg>
            </div>
            <ExampleCard english="I've been working for two hours." explanation="Я работаю уже два часа." />
            <p className={styles.note}>Продолжается или важна длительность сейчас.</p>
            <div className={styles.forSince}>
              <h3>Сколько времени?</h3>
              <p><strong lang="en">for two hours</strong> — период · <strong lang="en">since 9 AM</strong> — начало</p>
              <p className={styles.sinceExample} lang="en">I've been working since 9 AM.</p>
            </div>
          </Section>
        </div>

        <Section title="Результат или длительность?" className={styles.mainContrast}>
          <ComparisonBlock leftLabel="РЕЗУЛЬТАТ" rightLabel="ДЛИТЕЛЬНОСТЬ"
            left={<ExampleCard english="I've worked on the project." explanation="Важен факт / результат работы." />}
            right={<ExampleCard english="I've been working on the project for two hours." explanation="Важно, сколько длился процесс." />}
          />
        </Section>

        <div className={styles.twoColumns}>
          <Section title="Одно прошлое — раньше другого" className={styles.secondary}>
            <Timeline points={[{id:'finish',label:'Сначала: finished'},{id:'arrive',label:'Потом: he arrived'}]} label="Сначала закончил, потом он пришёл" />
            <ExampleCard english="I'd finished before he arrived." explanation="Я уже закончил до того, как он пришёл." />
          </Section>
          <Section title="Результат к моменту в будущем" className={styles.secondary}>
            <Timeline points={[{id:'now',label:'СЕЙЧАС'},{id:'friday',label:'К ПЯТНИЦЕ: готово'}]} activeId="friday" label="Результат будет готов к пятнице" />
            <ExampleCard english="I'll have finished by Friday." explanation="К пятнице я уже закончу." />
          </Section>
        </div>

        <div className={styles.twoColumns}>
          <Section title="Состояние — не процесс" className={styles.mistake}>
            <MistakeBox wrong="I've been knowing him for years." correct="I've known him for years." explanation="Я знаю его много лет. know — состояние: обычно без формы процесса." />
          </Section>
          <Section title="Попробуй сам" className={styles.practice}>
            <PracticeBox question="Ты работаешь уже два часа. Что важно?">
              <p className={styles.practiceChoice}>Результат <span>или</span> процесс и его длительность?</p>
              <p className={styles.answer}>✓ Процесс и его длительность.</p>
              <p className={styles.practiceEnglish} lang="en">I've been working for two hours.</p>
            </PracticeBox>
          </Section>
        </div>

        <aside className={styles.takeaway} aria-label="Главный вывод">
          <div className={styles.takeawayHeading}><strong>Спроси: что мне важно показать?</strong><p className={styles.note}>Не начинай с названия времени.<br />Начинай со смысла.</p></div>
          <ActionViews compact />
        </aside>
      </div>
      <CourseFooter card={card} previousLabel="Как английский показывает время" nextLabel="Могу / хочу / нужно / стоит" />
    </A4Page>
  );
}
