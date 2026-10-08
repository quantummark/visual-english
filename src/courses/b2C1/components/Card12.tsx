import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card12.module.css';

const route = [
  { role: 'POSITION', prompt: 'Что я думаю?', signal: 'I think', rest: ' remote work is better for many people.' },
  { role: 'REASON', prompt: 'Почему?', signal: 'The main reason is', rest: ' flexibility.' },
  { role: 'EXAMPLE', prompt: 'Как это выглядит в жизни?', signal: 'For example,', rest: " people don't have to spend hours commuting." },
  { role: 'OTHER SIDE', prompt: 'Что ещё важно?', signal: 'That said,', rest: " remote work isn't ideal for every team." },
  { role: 'CONCLUSION', prompt: 'К чему я прихожу?', signal: 'Overall,', rest: " I'd still prefer remote work, but I think the best setup depends on the team." },
] as const;

const practiceMap = [
  { role: 'POSITION', keyword: 'useful' },
  { role: 'REASON', keyword: 'practice' },
  { role: 'EXAMPLE', keyword: 'instant feedback' },
  { role: 'OTHER SIDE', keyword: 'dependency' },
  { role: 'CONCLUSION', keyword: 'use with limits' },
] as const;

export function Card12() {
  const card = b2C1Cards[11];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>12 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Длинный ответ не нужно держать целиком. Держи маршрут мысли.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <section className={styles.transition} aria-label="От одной идеи к целому ответу"><span lang="en">SENTENCE CONTROL → <b>DISCOURSE CONTROL</b></span><p>Card 05: одна идея слоями. Card 12: несколько идей в одном направлении.</p></section>
      <section className={styles.model} aria-labelledby="route-model">
        <header><h2 id="route-model" lang="en">THOUGHT ROUTE</h2><p>Один блок → следующий блок</p></header>
        <p className={styles.question} lang="en">Do you think remote work is better than working in an office?</p>
        <ol aria-label="Пять блоков ответа про remote work">{route.map((block, index) => <li key={block.role}>
          <span className={styles.node} aria-hidden="true">{index + 1}</span>
          <div className={styles.station}><strong lang="en">{block.role}</strong><p>{block.prompt}</p></div>
          <p className={styles.english} lang="en"><b>{block.signal}</b>{block.rest}</p>
        </li>)}</ol>
        <p className={styles.note}>Не обязательный шаблон: иногда хватит первых трёх блоков. Другая сторона — если важна.</p>
      </section>
      <section className={styles.blocks} aria-label="Длинный ответ не равен длинному предложению"><strong lang="en">LONG ANSWER ≠ LONG SENTENCE</strong><p>Несколько связанных мыслей могут звучать короткими предложениями.</p><span lang="en">BLOCK + BLOCK + BLOCK</span></section>
      <div className={styles.secondary}>
        <section aria-labelledby="route-anchor"><h2 id="route-anchor">ANCHOR — главная мысль</h2><p className={styles.example} lang="en">Remote work gives people more flexibility.</p><p className={styles.note}><b>«На какой вопрос я отвечаю?»</b> Новая история уводит в сторону? Вернись к опоре.</p><p className={styles.recovery} lang="en">The main point is…</p></section>
        <section aria-labelledby="route-plan"><h2 id="route-plan">Планируй идеи, не каждое слово</h2><p className={styles.keywords} lang="en">flexibility → commute → teamwork → depends on the team</p><p className={styles.note}>Ключевые слова → блоки → речь. Готовь следующий блок. Скрипт полезен при подготовке.</p></section>
      </div>
      <section className={styles.signposts} aria-label="Сигналы помогают следить за мыслью"><p><b>Выделенные фразы — сигналы.</b> Сначала логика, потом связки; точные слова не обязательны.</p></section>
      <section className={styles.range} aria-label="Возможная глубина ответа"><p className={styles.note}>20 → 60–90 сек: возможная глубина, не норма CEFR и не цель говорить дольше.</p></section>
      <section className={styles.practice} aria-labelledby="route-practice">
        <header><h2 id="route-practice">Преврати карту в ответ</h2><p lang="en">Is AI good for education?</p></header>
        <p className={styles.note}>Сначала ответь по ключевым словам. Затем сравни с примером: учи структуру, не текст.</p>
        <div className={styles.practiceBody}>
          <ol aria-label="Карта ответа про AI">{practiceMap.map((block) => <li key={block.role}><span lang="en">{block.role}</span><strong lang="en">{block.keyword}</strong></li>)}</ol>
          <div className={styles.practiceAnswer} lang="en" aria-label="Возможный ответ про AI">
            <p>I think AI can be useful for education.</p>
            <p>It can give learners more opportunities to practise.</p>
            <p>For example, they can get instant feedback on an exercise.</p>
            <p>That said, there's a risk of becoming too dependent on it.</p>
            <p>So overall, I'd use it with limits, as a tool to support thinking.</p>
          </div>
        </div>
      </section>
      <aside className={styles.takeaway} aria-label="Главный вывод"><div><strong>Удерживай маршрут. Говори блоками.</strong><p>Где я сейчас? Что дальше? В конце вернись к позиции — можно её уточнить.</p></div><p className={styles.takeawayFormula} lang="en">SPEAK BLOCK BY BLOCK</p></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">12 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
