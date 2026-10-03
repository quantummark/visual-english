import { A4Page, CourseHeader, CourseFooter, MainIdeaBox, DecisionTree, Section, ComparisonBlock, MistakeBox, PracticeBox } from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card10Quantity.module.css';

function Amount({ kind, scarce = false }: { kind: 'dots' | 'bar'; scarce?: boolean }) {
  return <div className={`${styles.amount} ${scarce ? styles.scarce : ''}`} aria-hidden="true">
    {kind === 'dots' ? <span className={styles.dots}>{Array.from({ length: scarce ? 1 : 3 }, (_, i) => <i key={i} />)}</span> : <span className={styles.bar}><i /></span>}
  </div>;
}

export function Card10Quantity() {
  const card = getCourseCard(10)!;
  return <A4Page cardId={card.id} accent={card.accent} className={styles.quantityPage}>
    <CourseHeader card={card} secondaryLabel="Основано на Block 07 — Quantity" />
    <div className={`page-content ${styles.content}`}>
      <MainIdeaBox><strong>Сначала не выбирай слово количества.</strong><p>Спроси: это можно посчитать по отдельности или нет?</p></MainIdeaBox>

      <section className={styles.mainTree} aria-label="Выбор слов количества">
        <DecisionTree question={<strong>МОЖНО ПОСЧИТАТЬ ПОШТУЧНО?</strong>} branches={[
          { id: 'yes', label: 'ДА — ОТДЕЛЬНЫЕ ЕДИНИЦЫ', content: <><Amount kind="dots" /><p className={styles.units} lang="en">1 user → 2 users → 3 users</p><h2 lang="en">many · a few · few</h2><p className={styles.english} lang="en">many users · many questions</p><p className={styles.question} lang="en">How many users?</p></> },
          { id: 'no', label: 'НЕТ — НЕ СЧИТАЕМ ПОШТУЧНО', content: <><Amount kind="bar" /><p className={styles.units} lang="en">time · information · money</p><h2 lang="en">much · a little · little</h2><p className={styles.english} lang="en">much time · much information</p><p className={styles.question} lang="en">How much time?</p></> },
        ]} />
        <div className={styles.bridge}><strong>ПОДХОДИТ ОБОИМ <span lang="en">a lot of</span></strong><div><p lang="en">a lot of users ↔ a lot of time</p><p className={styles.note}>много пользователей ↔ много времени</p></div></div>
        <p className={styles.note}>В обычном утверждении часто естественнее <span lang="en">a lot of</span>: <b lang="en">I have a lot of time.</b></p>
      </section>

      <Section title="Когда количество не точное" className={styles.someAny}>
        <div className={styles.twoColumns}>
          <div><strong lang="en">some</strong><span className={styles.hint}> — часто в утверждениях</span><p className={styles.english} lang="en">I need some information.</p><p className={styles.note}>Мне нужна некоторая информация.</p></div>
          <div><strong lang="en">any</strong><span className={styles.hint}> — часто в вопросах и отрицаниях</span><p className={styles.english} lang="en">Do you have any questions?</p><p className={styles.english} lang="en">I don't have any questions.</p><p className={styles.note}>Есть вопросы? / Нет вопросов.</p></div>
        </div>
        <p className={styles.note}>Оба слова подходят обеим группам. Это частая схема, но не жёсткое правило.</p>
      </Section>

      <div className={styles.twoColumns}>
        <Section title="a few / few — отдельные штуки" className={styles.contrast}>
          <ComparisonBlock leftLabel="a few users" rightLabel="few users"
            left={<><Amount kind="dots" /><strong className={styles.exists}>Несколько есть</strong><p className={styles.english} lang="en">We have a few users.</p><p className={styles.note}>У нас есть несколько.</p></>}
            right={<><Amount kind="dots" scarce /><strong className={styles.almostNone}>Почти нет</strong><p className={styles.english} lang="en">We have few users.</p><p className={styles.note}>Мало пользователей.</p></>} />
        </Section>
        <Section title="a little / little — общее количество" className={styles.contrast}>
          <ComparisonBlock leftLabel="a little time" rightLabel="little time"
            left={<><Amount kind="bar" /><strong className={styles.exists}>Немного есть</strong><p className={styles.english} lang="en">I have a little time.</p><p className={styles.note}>Есть немного времени.</p></>}
            right={<><Amount kind="bar" scarce /><strong className={styles.almostNone}>Почти нет</strong><p className={styles.english} lang="en">I have little time.</p><p className={styles.note}>Почти нет времени.</p></>} />
        </Section>
      </div>

      <div className={styles.bottomGrid}>
        <Section title="Не отдельные штуки"><MistakeBox wrong="many information" correct="a lot of information" explanation="information обычно не считаем поштучно." /></Section>
        <Section title="Немного времени"><MistakeBox wrong="a few time" correct="a little time" explanation="time здесь — общее количество." /></Section>
        <Section title="Попробуй сам"><PracticeBox question="Нужно немного больше времени.">
          <p className={styles.options} lang="en">a few more time / a little more time / many more time</p>
          <p className={styles.answer} lang="en">✓ a little more time</p><p className={styles.english} lang="en">I need a little more time.</p>
        </PracticeBox></Section>
      </div>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div className={styles.takeawayHeading}><strong>Можно ли это посчитать?</strong><p>Сначала тип количества → потом нужное слово.</p></div>
        <div className={styles.threePaths}>
          <div><strong>ДА <span lang="en">users / questions</span></strong><p lang="en">many · a few · few</p></div>
          <div><strong>НЕТ <span lang="en">time / information</span></strong><p lang="en">much · a little · little</p></div>
          <div><strong>ОБОИМ</strong><p lang="en">some · any · a lot of</p></div>
        </div>
      </aside>
    </div>
    <CourseFooter card={card} previousLabel="a / an / the / ничего" nextLabel="Реальность, возможность и «если бы»" />
  </A4Page>;
}
