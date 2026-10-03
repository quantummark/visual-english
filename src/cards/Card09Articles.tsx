import { A4Page, CourseHeader, CourseFooter, MainIdeaBox, DecisionTree, Section, ComparisonBlock, FlowArrow, MistakeBox, PracticeBox } from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card09Articles.module.css';

export function Card09Articles() {
  const card = getCourseCard(9)!;
  return <A4Page cardId={card.id} accent={card.accent} className={styles.articlesPage}>
    <CourseHeader card={card} secondaryLabel="Основано на Block 07 — Articles" />
    <div className={`page-content ${styles.content}`}>
      <MainIdeaBox><strong>Не спрашивай: «Какой артикль у этого слова?»</strong><p>Спроси: один неизвестный предмет, конкретный предмет или вообще категория?</p></MainIdeaBox>

      <section className={styles.mainTree} aria-label="Дерево выбора артикля">
        <DecisionTree question={<strong>О ЧЁМ Я ГОВОРЮ?</strong>} branches={[
          { id: 'one', label: 'ОДИН, НО НЕ КОНКРЕТНЫЙ', content: <><h2 lang="en">a / an</h2><p className={styles.english} lang="en">I need <b>a laptop</b>.</p><p className={styles.note}>Мне нужен ноутбук.<br />Не важно, какой именно.</p></> },
          { id: 'specific', label: 'КОНКРЕТНЫЙ', content: <><h2 lang="en">the</h2><p className={styles.english} lang="en">I need <b>the laptop</b> on the table.</p><p className={styles.note}>Мне нужен ноутбук на столе.<br />Понятно, какой именно.</p></> },
          { id: 'general', label: 'ГОВОРИМ ВООБЩЕ', content: <><h2>ничего</h2><p className={styles.english} lang="en"><b>Laptops</b> are expensive.</p><p className={styles.note}>Ноутбуки дорогие.<br />Говорим о категории.</p></> },
        ]} />
        <p className={styles.treeNote}>Вообще: множественное число (<span lang="en">laptops</span>) или то, что не считаем по одному (<span lang="en">Coffee is popular.</span>).</p>
      </section>

      <Section title="Первый раз → уже знаем какой" className={styles.sequence}>
        <div className={styles.dogFlow}>
          <div><p className={styles.english} lang="en">I saw <b>a dog</b>.</p><p className={styles.note}>Я увидел собаку.</p></div>
          <FlowArrow />
          <div><p className={styles.english} lang="en"><b>The dog</b> was friendly.</p><p className={styles.note}>Собака была дружелюбной.</p></div>
        </div>
      </Section>

      <section aria-label="Вообще или конкретно?">
        <ComparisonBlock leftLabel="Вообще → ничего" rightLabel="Конкретно → the"
          left={<><p className={styles.english} lang="en">Information is important.</p><p className={styles.note}>Информация важна.</p></>}
          right={<><p className={styles.english} lang="en">The information you sent was useful.</p><p className={styles.note}>Информация, которую ты прислал, была полезной.</p></>} />
      </section>

      <div className={styles.twoColumns}>
        <Section title="Не считаем по одной" className={styles.detail}>
          <p className={styles.words} lang="en">information · advice · money · time</p>
          <p className={styles.english} lang="en">Some information.</p>
          <p className={styles.note}><span lang="en">a / an</span> — один счётный предмет.<br /><span lang="en">the</span> — если понятно, какой именно.</p>
        </Section>
        <Section title="a или an?" className={styles.detail}>
          <p className={styles.soundRule}>По звуку, а не по букве.</p>
          <div className={styles.sounds}>
            <p><span lang="en">a <b>u</b>ser · a <b>u</b>niversity</span> <span className={styles.note}>— начало «й».</span></p>
            <p><span lang="en">an <b className={styles.silent}>h</b><b>ou</b>r · an <b>i</b>dea</span> <span className={styles.note}>— h не звучит.</span></p>
          </div>
        </Section>
      </div>

      <div className={styles.bottomGrid}>
        <Section title="Профессия одного человека">
          <MistakeBox wrong="I'm developer." correct="I'm a developer." explanation="Я разработчик — один представитель профессии." />
        </Section>
        <Section title="Если подойдёт любой">
          <p className={styles.context}>Конкретный ноутбук не выбран.</p>
          <MistakeBox wrong="I need the laptop." correct="I need a laptop." explanation="the laptop верно, если понятно, какой именно." />
        </Section>
        <Section title="Попробуй сам">
          <PracticeBox question="Нужен ноутбук на столе. Какой вариант?">
            <p className={styles.options} lang="en">a laptop · the laptop · laptops</p>
            <p className={styles.answer} lang="en">✓ the laptop</p>
            <p className={styles.practiceSentence} lang="en">I need the laptop on the table.</p>
            <p className={styles.note}>Мне нужен ноутбук на столе.</p>
          </PracticeBox>
        </Section>
      </div>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div className={styles.takeawayHeading}><strong>Что я имею в виду?</strong><p className={styles.note}>Артикль показывает слушателю, как понимать предмет.</p></div>
        <div className={styles.threePaths}>
          <p>Один, не конкретный → <b lang="en">a / an</b><span lang="en">a laptop → один</span></p>
          <p>Конкретный → <b lang="en">the</b><span lang="en">the laptop → конкретный</span></p>
          <p>Вообще → <b>ничего</b><span lang="en">laptops → категория</span></p>
        </div>
      </aside>
    </div>
    <CourseFooter card={card} previousLabel="Предлоги и готовые фразы" nextLabel="Как говорить о количестве" />
  </A4Page>;
}
