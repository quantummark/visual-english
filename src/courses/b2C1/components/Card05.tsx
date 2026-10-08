import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card05.module.css';

const layers = [
  { label: 'CORE', question: 'Главная мысль', previous: '', added: 'We should delay the launch.' },
  { label: '+ DETAIL', question: 'До какого срока?', previous: 'We should delay the launch ', added: 'until the payment flow is stable.' },
  { label: '+ REASON', question: 'Почему?', previous: 'We should delay the launch until the payment flow is stable ', added: 'because several important cases are still failing.' },
  { label: '+ CONTEXT', question: 'Где особенно?', previous: 'We should delay the launch until the payment flow is stable because several important cases are still failing, ', added: 'especially on mobile.' },
] as const;
const questions = ['Какое главное сообщение?', 'Могу сказать его просто?', 'Что нужно слушателю дальше?', 'Добавляю один слой.', 'Тяжело? Разделяю мысль.'] as const;

export function Card05() {
  const card = b2C1Cards[4];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>05 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Скажи главное. Потом добавляй только то, что помогает понять мысль точнее.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <p className={styles.stage}>PRECISION → COMPLEX IDEAS <span>От точности мысли — к её связям.</span></p>
      <section className={styles.model} aria-labelledby="layers-model">
        <h2 id="layers-model" className={styles.formula} lang="en">CORE IDEA → ADD A LAYER → ADD ANOTHER</h2>
        <ol className={styles.layers} aria-label="Как растёт мысль о запуске">{layers.map((layer, index) => <li key={layer.label}>
          <div><span className={styles.label} lang="en">{layer.label}</span><span className={styles.question}>{layer.question}</span></div>
          <p lang="en" className={index === 0 ? styles.core : undefined}>{layer.previous}<b>{layer.added}</b></p>
        </li>)}</ol>
        <p className={styles.note}><b>Не каждой мысли нужны все четыре слоя.</b></p>
      </section>

      <div className={styles.support}><section className={styles.split} aria-labelledby="layers-split">
        <h2 id="layers-split">Сложная мысль ≠ длинная фраза</h2>
        <p className={styles.note}>Тяжело в одной фразе? <b>Раздели.</b></p>
        <div className={styles.twoSentences} lang="en"><p>We should delay the launch until the payment flow is stable.</p><p>Several important cases are still failing, especially on mobile.</p></div>
      </section>

      <section className={styles.additions} aria-label="Добавь к уже названному">
        <div><h2>Добавь к уже названному</h2>
          <p className={styles.example} lang="en">We spoke to a user<br /><b>who had the same problem.</b></p>
          <p className={styles.note}>Слой о человеке: какой пользователь?</p>
          <p className={styles.example} lang="en">The launch was delayed,<br /><b>which gave us more time to test.</b></p>
          <p className={styles.note}>Событие → что из этого получилось.</p>
        </div>
      </section></div>

      <aside className={styles.listener} aria-label="Строй мысль для слушателя">
        <div><h2>Что слушателю нужно дальше?</h2><p>Почему? → причина. Какой? → деталь.<br />Когда? → время. Если? → условие.</p></div>
        <div><span className={styles.label}>ЯДРО СНАЧАЛА</span><p>Переводить всё целиком → потерять структуру.</p><p><b>Английское ядро → нужные слои.</b></p></div>
      </aside>

      <section className={styles.thinking} aria-labelledby="layers-thinking">
        <h2 id="layers-thinking">Во время речи: добавляй по одному слою</h2>
        <div className={styles.thinkingPath}><ol>{questions.map((question, index) => <li key={question}><span aria-hidden="true">{index + 1}</span>{question}</li>)}</ol><p>→ CONTINUE</p></div>
      </section>

      <section className={styles.practice} aria-labelledby="layers-practice">
        <header><h2 id="layers-practice">Построй мысль</h2><p lang="en">CORE: <b>We need more time.</b></p></header>
        <ol><li><span>ПОЧЕМУ?</span><p lang="en">We need more time <b>because the testing isn't finished.</b></p></li><li><span>ЧТО ЕЩЁ?</span><p lang="en">We need more time because the testing isn't finished <b>and several issues still need to be fixed.</b></p></li></ol>
        <p className={styles.note}><b>Можно разделить:</b> <span lang="en">We need more time because the testing isn't finished. Several issues still need to be fixed.</span></p>
        <p className={styles.answer}>Оба варианта могут быть хорошими. Цель — ясность, а не длина.</p>
      </section>

      <aside className={styles.takeaway} aria-label="Главный вывод"><div><strong>Начни с простой мысли.</strong><p>Что ещё нужно знать слушателю? Добавляй только важное.</p></div><p className={styles.takeawayFormula} lang="en">CORE → LAYERS → CLEAR IDEA</p></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">05 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
