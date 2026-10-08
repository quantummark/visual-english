import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card07.module.css';

const questions = ['Какова моя позиция?', 'Что ещё тоже верно?', 'Это ограничивает мысль?', 'Сравнение или оговорка?', 'Как соединить ясно?'] as const;
const options = [
  { label: 'A', sentence: 'The tool is easy to use.' },
  { label: 'B', sentence: 'The tool lacks advanced features.' },
  { label: 'C', sentence: 'The tool is easy to use, but it lacks several advanced features.' },
] as const;

export function Card07() {
  const card = b2C1Cards[6];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>07 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Продвинутая мысль часто не выбирает между A и B. Она показывает, как обе стороны существуют вместе.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="balance-model">
        <h2 id="balance-model" className={styles.formula} lang="en">SIDE A ↔ SIDE B</h2>
        <div className={styles.sides}>
          <div><span className={styles.label}>SIDE A · ПРОСТОТА</span><strong lang="en">The product is simple.</strong></div>
          <span className={styles.bridge} aria-hidden="true">↔</span>
          <div><span className={styles.label}>SIDE B · ОГРАНИЧЕНИЯ</span><strong lang="en">It has some limitations.</strong></div>
        </div>
        <div className={styles.combined}><p lang="en">The product is simple, <b>but it has some limitations.</b></p></div>
        <p className={styles.note}>A не отменяет B. B не отменяет A. <b>Полезно — и ограничено: сохраняем обе стороны.</b></p>
      </section>

      <section className={styles.shapes} aria-labelledby="balance-shapes">
        <h2 id="balance-shapes">Выбирай форму мысли, а не «продвинутое» слово</h2>
        <dl>
          <div><dt lang="en">but</dt><dd><p>Прямо соединяем стороны. Естественно и полезно.</p></dd></div>
          <div><dt lang="en">although</dt><dd><p lang="en"><b>Although</b> the product is simple, it still has some limitations.</p><span>Признаём A — и показываем, что B всё равно важно.</span></dd></div>
          <div><dt lang="en">that said</dt><dd><p lang="en">The product is simple. <b>That said,</b> it still has some limitations.</p><span>A остаётся верным. Затем добавляем оговорку.</span></dd></div>
        </dl>
        <p className={styles.note}><b>however</b> помогает оформить отдельный контраст. Это не «улучшенный but».</p>
      </section>

      <div className={styles.perspectives}>
        <section aria-labelledby="balance-contrast"><h2 id="balance-contrast">Контраст ≠ спор</h2><p className={styles.example} lang="en">Remote work is convenient,<br /><b>but face-to-face meetings can still be valuable.</b></p><p className={styles.note}>Обе мысли верны. Контраст не делает одну ошибкой.</p></section>
        <section aria-labelledby="balance-position"><h2 id="balance-position">Баланс ≠ неуверенность</h2><p className={styles.example} lang="en">I think remote work is generally a good thing.<br /><b>That said,</b> it doesn't work equally well for every team.</p><p className={styles.note}>Позиция ясна — мы признаём её границы.</p></section>
      </div>


      <section className={styles.mistake} aria-labelledby="balance-mistake"><h2 id="balance-mistake">Одна связь — не although + but вместе</h2><div><p lang="en"><span className={styles.status}>✕</span> Although the idea is good,<br /><b>but</b> it's too expensive.</p><p lang="en"><span className={styles.status}>✓</span> Although the idea is good,<br />it's too expensive.</p></div></section>

      <section className={styles.thinking} aria-labelledby="balance-thinking"><h2 id="balance-thinking">Простой ответ верен. Добавь другую сторону — получишь более полную мысль.</h2><div className={styles.thinkingPath}><ol>{questions.map((question, index) => <li key={question}><span aria-hidden="true">{index + 1}</span>{question}</li>)}</ol><p>→ BUILD THE BALANCED IDEA</p></div></section>

      <section className={styles.practice} aria-labelledby="balance-practice"><header><h2 id="balance-practice">Сохрани обе стороны</h2><p>Инструмент прост, но ему не хватает функций.</p></header><ul>{options.map((option) => <li key={option.label}><span>{option.label}</span><p lang="en">{option.sentence}</p></li>)}</ul><p className={styles.answer}>Какой ответ сохраняет обе стороны? <b>C.</b> A и B показывают только одну.</p><p className={styles.alternative} lang="en">The tool is easy to use. <b>That said,</b> it lacks some of the advanced features we need.</p></section>

      <aside className={styles.takeaway} aria-label="Главный вывод"><div><strong>Удержи две правды одновременно.</strong><p>Покажи позицию и её границы. Собери более точную мысль.</p></div><p className={styles.takeawayFormula} lang="en">SIDE A ↔ SIDE B → FULLER IDEA</p></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">07 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
