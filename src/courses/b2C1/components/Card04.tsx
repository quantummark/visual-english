import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card04.module.css';

const questions = ['Что я хочу сказать?', 'Что самое важное?', 'Нужен ли контраст?', 'Хватит обычной фразы?', 'Структура или голос?'] as const;

export function Card04() {
  const card = b2C1Cards[3];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>04 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Английский помогает не только сказать мысль, но и показать слушателю, куда смотреть.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="focus-model">
        <h2 id="focus-model" className={styles.formula} lang="en">IDEA <span>→</span> FOCUS <span>→</span> FORM</h2>
        <div className={styles.attention}>
          <div><span className={styles.label}>ОДНА МЫСЛЬ</span><p>Мне нужно больше времени.</p></div>
          <div className={styles.spotlight}><span className={styles.label}>ЧТО ВЫДЕЛИТЬ?</span><strong lang="en">MORE TIME</strong></div>
        </div>
        <div className={styles.comparison}>
          <div><span className={styles.label}>НЕЙТРАЛЬНО</span><p lang="en">I need more time.</p></div>
          <div><span className={styles.label}>ФОКУС НА ПОТРЕБНОСТИ</span><p lang="en">What I need is <b>more time.</b></p></div>
        </div>
        <p className={styles.insight}>Информация похожа. <b>Меняется то, что мы выделяем.</b></p>
      </section>

      <section className={styles.patterns} aria-label="Фокус через структуру">
        <div>
          <h2>Что здесь главное?</h2>
          <p className={styles.pattern} lang="en">WHAT + IDEA + IS + <b>FOCUS</b></p>
          <p className={styles.note}>Называем ситуацию → показываем главное.</p>
          <p className={styles.example} lang="en">What matters is <b>the result.</b></p>
        </div>
        <div>
          <h2>Кто именно?</h2>
          <p className={styles.pattern} lang="en">IT WAS + <b>FOCUS</b> + WHO/THAT…</p>
          <p className={styles.example} lang="en">John made the decision.</p>
          <p className={styles.example} lang="en">It was <b>John</b> who made the decision.</p>
          <p className={styles.note}>Именно John — не Sarah. Выделяем намеренно.</p>
        </div>
      </section>

      <section className={styles.voice} aria-labelledby="focus-voice">
        <header><h2 id="focus-voice">Структура + голос</h2><p>Форма предложения или ударение направляют внимание.</p></header>
        <div className={styles.voiceExamples}>
          <div><p className={styles.stress} lang="en">I said <b>TUESDAY</b>, not Thursday.</p><p className={styles.note}>Выделяем время голосом.<br />Жирный текст — место ударения.</p></div>
          <div className={styles.dialogues}>
            <div><p lang="en">What do you need?</p><p lang="en">I need <b>MORE TIME.</b></p></div>
            <div><p lang="en">Who needs more time?</p><p lang="en"><b>I</b> need more time.</p></div>
          </div>
        </div>
      </section>

      <aside className={styles.restraint} aria-label="Нейтральная речь тоже хороша">
        <div><h2>Не каждую фразу нужно усиливать.</h2><p><span lang="en">I need more time.</span> — естественно и правильно.<br />Привычка: всё нейтрально. C1 добавляет выбор.</p></div>
        <div><strong>Фокус ≠ сложность</strong><p lang="en">The problem is <b>the cost.</b></p></div>
      </aside>

      <section className={styles.thinking} aria-labelledby="focus-thinking">
        <h2 id="focus-thinking">Перед речью: что именно я хочу выделить?</h2>
        <div className={styles.thinkingPath}><ol>{questions.map((question, index) => <li key={question}><span aria-hidden="true">{index + 1}</span>{question}</li>)}</ol><p>→ CHOOSE THE FOCUS</p></div>
      </section>

      <section className={styles.practice} aria-labelledby="focus-practice">
        <header><h2 id="focus-practice">Направь внимание</h2><p>Обсуждали втроём, но решение принял именно John.</p></header>
        <ul lang="en"><li><span>A</span>John made the decision.</li><li><span>B</span>It was <b>John</b> who made the decision.</li></ul>
        <p className={styles.answer}>Что лучше выделяет, <b>КТО</b> принял решение? <b>B: именно John.</b> Вариант A тоже правильный.</p>
        <div className={styles.price}><p>Выдели цену:</p><p lang="en">The price is a problem. <span>→</span> The main problem is <b>the price.</b></p></div>
      </section>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div><strong>Реши, куда направить внимание.</strong><p>Что здесь главное? Потом выдели это структурой или голосом.</p></div>
        <p className={styles.takeawayFormula} lang="en">IDEA → FOCUS → FORM</p>
        <div className={styles.completion}><p lang="en">PRECISION · 01 Meaning · 02 Certainty · 03 Tone · <b>04 Focus</b></p><span>Далее: Complex Ideas</span></div>
      </aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">04 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
