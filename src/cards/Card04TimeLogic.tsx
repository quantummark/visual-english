import {
  A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, Timeline,
  ComparisonBlock, ExampleCard, MistakeBox, PracticeBox,
} from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card04TimeLogic.module.css';

function ViewIcon({ process = false }: { process?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {process ? <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m10 9 5 3-5 3Z" /></> : <><path d="M8 5 9.5 3h5L16 5h4a1 1 0 0 1 1 1v13H3V6a1 1 0 0 1 1-1Z" /><circle cx="12" cy="12" r="4" /></>}
    </svg>
  );
}

const timePoints = [
  { id: 'past', label: 'РАНЬШЕ' },
  { id: 'now', label: 'СЕЙЧАС / ОБЫЧНО' },
  { id: 'future', label: 'ПОТОМ' },
] as const;

export function Card04TimeLogic() {
  const card = getCourseCard(4)!;
  return (
    <A4Page cardId={card.id} accent={card.accent} className={styles.timePage}>
      <CourseHeader card={card} secondaryLabel="Основано на Block 03 — Main Tenses" />
      <div className={`page-content ${styles.content}`}>
        <MainIdeaBox>
          <strong>Не начинай с названия времени.</strong>
          <p>Сначала спроси: когда это происходит и что я хочу показать — факт или процесс?</p>
        </MainIdeaBox>

        <section className={styles.timeModel} aria-label="Время плюс взгляд на действие: карта шести форм">
          <h2>КОГДА? <span>+ ЧТО ВАЖНО?</span> → ФОРМА</h2>
          <div className={styles.timeline}><Timeline points={timePoints} activeId="now" /></div>
          <div className={styles.modeLabels}>
            <div><ViewIcon /><p><strong>ФАКТ</strong><span> — действие как факт.</span></p></div>
            <div><ViewIcon process /><p><strong>ПРОЦЕСС</strong><span> — смотрим внутрь действия.</span></p></div>
          </div>
          <div className={styles.mapRow}>
            <div className={styles.rowLabel}><ViewIcon /><strong>ФАКТ</strong></div>
            <ExampleCard english="I worked." explanation="работал / сделал раньше" />
            <ExampleCard english="I work." explanation="обычно / вообще" />
            <ExampleCard english="I'll work." explanation="буду работать" />
          </div>
          <div className={`${styles.mapRow} ${styles.processRow}`}>
            <div className={styles.rowLabel}><ViewIcon process /><strong>ПРОЦЕСС</strong></div>
            <ExampleCard english="I was working." explanation="был в процессе" />
            <ExampleCard english="I'm working." explanation="прямо сейчас" />
            <ExampleCard english="I'll be working." explanation="буду в процессе" />
          </div>
        </section>

        <Section title="Обычно или прямо сейчас?" className={styles.mainContrast}>
          <ComparisonBlock leftLabel="Обычно / регулярно · факт, привычка" rightLabel="Сейчас / временно · процесс"
            left={<ExampleCard english="I work from home." explanation="Я обычно работаю дома." />}
            right={<ExampleCard english="I'm working from home today." explanation="Сегодня я работаю дома." />}
          />
          <p className={styles.meaningNote}>Одно и то же время может выглядеть по-разному, если меняется взгляд на действие.</p>
        </Section>

        <div className={styles.twoColumns}>
          <Section title="Раньше: факт или процесс?" className={styles.secondary}>
            <p className={styles.inlineExample}><strong lang="en">I worked yesterday.</strong> <span>Работал вчера — факт.</span></p>
            <ExampleCard english="I was working at 5 PM yesterday." explanation="Вчера в 5 я был в процессе работы." />
          </Section>
          <Section title="А что с будущим?" className={styles.secondary}>
            <p className={styles.inlineExample}><strong lang="en">I'll work tomorrow.</strong> <span>Факт / решение.</span></p>
            <ExampleCard english="I'll be working at 5 PM." explanation="В 5 вечера действие будет идти." />
          </Section>
        </div>

        <Section title="Что может подсказать смысл?" className={styles.clues}>
          <div className={styles.twoColumns}>
            <p><strong>Факт / привычка</strong><span lang="en">every day · usually · often · sometimes · yesterday</span></p>
            <p><strong>Процесс</strong><span lang="en">now · right now · at the moment · today · at 5 PM</span></p>
          </div>
          <p className={styles.note}>Слова-подсказки помогают, но главное — понять ситуацию.</p>
        </Section>

        <div className={styles.twoColumns}>
          <Section title="Типичная ошибка" className={styles.mistake}>
            <MistakeBox wrong="I'm work now." correct="I'm working now." explanation="Процесс: am / is / are + действие с -ing." />
          </Section>
          <Section title="Попробуй сам" className={styles.practice}>
            <PracticeBox question="Ты говоришь о том, что делаешь прямо сейчас.">
              <p className={styles.choices} lang="en">I work. <span>или</span> I'm working.</p>
              <p className={styles.answer}><strong lang="en">✓ I'm working.</strong> Сейчас идёт процесс.</p>
            </PracticeBox>
          </Section>
        </div>

        <aside className={styles.takeaway} aria-label="Главный вывод">
          <div className={styles.takeawayHeading}><strong>Не выбирай форму по русскому переводу.</strong><p>Сначала: <b>1. Когда?</b> <b>2. Факт или процесс?</b></p></div>
          <div className={styles.memoryModel}>РАНЬШЕ ← СЕЙЧАС → ПОТОМ <span>+</span> ФАКТ ↔ ПРОЦЕСС</div>
          <p className={styles.memoryLine}><ViewIcon /> Факт = фотография. <ViewIcon process /> Процесс = видео.</p>
        </aside>
      </div>
      <CourseFooter card={card} previousLabel="Вопросы и отрицания" nextLabel="Результат и длительность" />
    </A4Page>
  );
}

