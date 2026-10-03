import { A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, ComparisonBlock, FlowArrow, MistakeBox, PracticeBox } from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card11RealityConditionals.module.css';

export function Card11RealityConditionals() {
  const card = getCourseCard(11)!;
  return <A4Page cardId={card.id} accent={card.accent} className={styles.realityPage}>
    <CourseHeader card={card} secondaryLabel="Основано на первой части Block 08 — B2 Structures" />
    <div className={`page-content ${styles.content}`}>
      <MainIdeaBox><strong>Не начинай с номера правила.</strong><p>Сначала спроси: ситуация реальна, воображаемая сейчас или это другое прошлое?</p></MainIdeaBox>
      <section className={styles.ladder} aria-label="Три уровня реальности">
        <h2>Насколько эта ситуация реальна?</h2>
        <div className={`${styles.level} ${styles.real}`}>
          <div className={styles.levelTitle}><span className={styles.marker}>1</span><div><small>УРОВЕНЬ 1</small><h3>Реально может произойти</h3></div></div>
          <div><p className={styles.mainExample} lang="en">If I <b>have</b> time, <b>I'll call</b> you.</p><p className={styles.note}>Если у меня будет время, я тебе позвоню.</p><p className={styles.meaning}>Условие → возможный результат. Время может появиться.</p></div>
        </div>
        <div className={styles.connector}><FlowArrow direction="down" /></div>
        <div className={`${styles.level} ${styles.imagined}`}>
          <div className={styles.levelTitle}><span className={styles.marker}>2</span><div><small>УРОВЕНЬ 2</small><h3>Другая ситуация сейчас</h3></div></div>
          <div><p className={styles.mainExample} lang="en">If I <b>had</b> more time, <b>I'd travel</b> more.</p><p className={styles.note}>Если бы у меня было больше времени, я бы больше путешествовал.</p><p className={styles.meaning}>Сейчас времени мало → представляем, что его больше.</p></div>
        </div>
        <div className={styles.connector}><FlowArrow direction="down" /></div>
        <div className={`${styles.level} ${styles.past}`}>
          <div className={styles.levelTitle}><span className={styles.marker}>3</span><div><small>УРОВЕНЬ 3</small><h3>Представляем другое прошлое</h3></div></div>
          <div><p className={styles.mainExample} lang="en">If I <b>had known</b>, <b>I would've called</b>.</p><p className={styles.note}>Если бы я знал, я бы позвонил.</p><p className={styles.meaning}>Но я не знал и не позвонил. Прошлое уже произошло.</p></div>
        </div>
      </section>

      <section aria-label="have и had: разная связь с реальностью">
        <ComparisonBlock leftLabel="have — возможно, время будет" rightLabel="had — сейчас всё иначе"
          left={<p className={styles.english} lang="en">If I <b>have</b> time, I'll call you.</p>}
          right={<p className={styles.english} lang="en">If I <b>had</b> more time, I'd travel more.</p>} />
        <p className={styles.note}>Форма прошлого здесь показывает другую реальность сейчас, а не прошлое время.</p>
      </section>

      <div className={styles.modalMap}>
        <div><strong lang="en">would <span>— сделал бы</span></strong><p className={styles.english} lang="en">I'd choose this option.</p></div>
        <div><strong lang="en">could <span>— мог бы</span></strong><p className={styles.english} lang="en">We could try another way.</p></div>
        <div><strong lang="en">might <span>— возможно</span></strong><p className={styles.english} lang="en">It might work.</p></div>
      </div>

      <Section title="Что произошло на самом деле?" className={styles.reconstruction}>
        <div className={styles.pastPaths}>
          <div><strong>На самом деле</strong><p lang="en">I didn't know. → I didn't call.</p></div>
          <div><strong>Другой вариант прошлого</strong><p lang="en">If I had known… → I would've called.</p></div>
        </div>
        <p className={styles.note}><span lang="en">if + had + V3 → would have + V3</span>. V3 — третья форма действия: <span lang="en">known, called</span>.</p>
      </Section>

      <div className={styles.bottomGrid}>
        <Section title="Обычное реальное условие"><MistakeBox wrong="If I will have time, I'll call you." correct="If I have time, I'll call you." explanation="В таком будущем условии после if обычно не ставим will." /></Section>
        <Section title="Другой вариант прошлого"><MistakeBox wrong="If I would have known, I would've called." correct="If I had known, I would've called." explanation="В части с if: had + третья форма действия." /></Section>
        <Section title="Попробуй сам"><PracticeBox question="Времени мало. Представляешь, что его больше. Какой уровень?">
          <p className={styles.options}>1 — реально · 2 — другое сейчас · 3 — другое прошлое</p><p className={styles.answer}>✓ 2 — другая ситуация сейчас</p><p className={styles.english} lang="en">If I had more time, I'd travel more.</p>
        </PracticeBox></Section>
      </div>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div className={styles.takeawayHeading}><strong>Какая это реальность?</strong><p>Сначала пойми смысл, затем выбирай форму.</p></div>
        <div className={styles.threePaths}>
          <div><strong>Реально ↓</strong><p lang="en">If I have time, I'll call you.</p></div>
          <div><strong>Представляем сейчас ↓</strong><p lang="en">If I had more time, I'd travel more.</p></div>
          <div><strong>Другое прошлое</strong><p lang="en">If I had known, I would've called.</p></div>
        </div>
      </aside>
    </div>
    <CourseFooter card={card} previousLabel="Как говорить о количестве" nextLabel="Как выражать более сложные мысли" />
  </A4Page>;
}
