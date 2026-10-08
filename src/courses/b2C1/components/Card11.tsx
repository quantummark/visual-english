import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card11.module.css';

const pillars = [['CLEAR', 'Мысль легко понять.'], ['PRECISE', 'Сказано именно то, что нужно.'], ['NATURAL', 'Форма подходит контексту.']] as const;

export function Card11() {
  const card = b2C1Cards[10];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>11 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Продвинутый English — это не больше слов. Это больше контроля.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="control-model">
        <h2 id="control-model" lang="en">MORE WORDS <span>≠</span> MORE ADVANCED</h2>
        <ul aria-label="Три цели продвинутого английского">{pillars.map(([name, meaning]) => <li key={name}><strong lang="en">{name}</strong><p>{meaning}</p></li>)}</ul>
        <p className={styles.modelFormula} lang="en">CLEAR + PRECISE + NATURAL = ADVANCED CONTROL</p>
        <p className={styles.note}>Сложность — по смыслу, а не для впечатления. <b>Короче ≠ всегда лучше.</b></p>
      </section>
      <section className={styles.contrast} aria-label="От перегруженной фразы к ясной">
        <div><span className={styles.label} lang="en">HEAVY / OVERLOADED</span><p lang="en">It is my personal opinion that this particular approach could potentially be considered somewhat problematic.</p></div>
        <span className={styles.arrow} aria-hidden="true">→</span>
        <div><span className={styles.label} lang="en">CLEAR / NATURAL</span><strong lang="en">I think this approach could be a problem.</strong></div>
        <p className={styles.note}>Это выбор стиля, не исправление грамматики. <b lang="en">I think + could</b> сохраняют позицию и возможность.</p>
      </section>
      <div className={styles.middle}><section className={styles.choice} aria-labelledby="control-choice">
        <h2 id="control-choice">Advanced = «я могу выбрать»</h2>
        <ul aria-label="Три способа предложить подождать">
          <li><span className={styles.label} lang="en">DIRECT</span><p lang="en">We should wait.</p></li>
          <li><span className={styles.label} lang="en">NEUTRAL</span><p lang="en">I think we should wait.</p></li>
          <li><span className={styles.label} lang="en">STRUCTURED</span><p lang="en">Given the uncertainty, I think it would be better to wait.</p></li>
        </ul>
      </section>

        <section aria-labelledby="control-register"><h2 id="control-register">Formal ≠ advanced</h2><p className={styles.example} lang="en">We need to fix this.<br />This issue needs to be addressed.</p><p className={styles.note}>Formal — стиль. Выбор зависит от контекста.</p><p className={styles.note}><span lang="en">start / commence</span>: формальнее ≠ лучше.</p></section>
      </div>
      <section className={styles.complexity} aria-labelledby="control-complexity"><h2 id="control-complexity">Сложность с задачей</h2><p className={styles.example} lang="en">Although the product is easy to use, it still lacks several features that larger teams need.</p><p className={styles.note}>Контраст + уточнение: каждая часть добавляет смысл. Так же работают причина и условие.</p></section>
      <div className={styles.tools}>
      <section className={styles.editing} aria-labelledby="control-editing">
        <h2 id="control-editing" lang="en">HEAVY → CLEAR → PRECISE</h2>
        <div className={styles.editRow}><span className={styles.label} lang="en">HEAVY</span><p lang="en">We currently have a number of problems which need to be addressed.</p></div>
        <div className={styles.editRow}><span className={styles.label} lang="en">CLEAR</span><p lang="en">We still have several problems to fix.</p></div>
        <div className={styles.editRow}><span className={styles.label} lang="en">PRECISE</span><p lang="en"><b>We still have three payment issues to fix.</b></p></div>
        <p className={styles.note}>PRECISE — если известны три проблемы с оплатой. <b>Не придумывай детали.</b></p>
      </section>
      <section className={styles.thinking} aria-labelledby="control-thinking"><h2 id="control-thinking">Каждое лишнее слово должно работать</h2><p className={styles.note}>Смысл, тон, контекст? Оставь. Повторы? Убери. <span lang="en">Personally</span> полезно для контраста.</p><p className={styles.flow}>Смысл → оттенок → слушатель → ясная форма → стоп, когда смысл полный.</p></section>
      </div>
      <section className={styles.practice} aria-labelledby="control-practice">
        <header><h2 id="control-practice">Сохрани смысл. Убери повторы.</h2><p>Сначала выбери сам.</p></header>
        <p className={styles.original} lang="en">In my personal opinion, I think that this plan may possibly be too expensive.</p>
        <ol aria-label="Варианты редактирования"><li lang="en"><span>A</span>I personally think, in my opinion, the plan may possibly be too expensive.</li><li lang="en"><span>B</span>I think this plan may be too expensive.</li></ol>
        <p className={styles.note}><b>B:</b> <span lang="en">I think</span> сохраняет позицию, <span lang="en">may</span> — неуверенность. Повторы исчезают.</p>

      </section>
      <aside className={styles.takeaway} aria-label="Главный вывод"><strong>Не «звучать сложнее», а сказать точнее.</strong><div><span lang="en">09 PARTNERS → 10 PATTERNS → <b>11 CONTROL</b></span><span lang="en">NEXT: DISCOURSE & CONVERSATION</span></div></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">11 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → Как держать длинную мысль</a>}</footer>
  </A4Page>;
}
