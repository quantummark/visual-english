import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card06.module.css';

const events = [
  { label: 'CAUSE', question: 'Почему?', sentence: "The system wasn't ready." },
  { label: 'RESULT', question: 'Что из этого получилось?', sentence: 'We delayed the launch.' },
  { label: 'CONSEQUENCE', question: 'К чему это привело?', sentence: 'We had more time to test.' },
] as const;
const questions = ['Что произошло?', 'Почему?', 'Что получилось?', 'Что было дальше?', 'Это причина или цель?'] as const;

export function Card06() {
  const card = b2C1Cards[5];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>06 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Покажи слушателю не только события, но и связь между ними.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="cause-model">
        <h2 id="cause-model" className={styles.formula} lang="en">CAUSE → RESULT → CONSEQUENCE</h2>
        <ol className={styles.chain} aria-label="Логическая цепочка запуска">{events.map((event) => <li key={event.label}>
          <span className={styles.label} lang="en">{event.label}</span><span className={styles.question}>{event.question}</span><strong lang="en">{event.sentence}</strong>
        </li>)}</ol>
        <div className={styles.continuation}><span aria-hidden="true">↓</span><p lang="en">We found two serious bugs.</p><span aria-hidden="true">→</span><p lang="en">The final release was more stable.</p></div>
        <p className={styles.note}><b>Результат может стать причиной дальше.</b> Но порядок событий ≠ причинная связь.</p>
      </section>

      <section className={styles.direction} aria-labelledby="cause-direction">
        <header><h2 id="cause-direction">Те же события — разная точка начала</h2><p>Связь та же. Выбирай, откуда объяснять.</p></header>
        <div className={styles.pair}>
          <div><span className={styles.label}>ПРИЧИНА СНАЧАЛА · so → РЕЗУЛЬТАТ</span><p lang="en">The system wasn't ready,<br /><b>so</b> we delayed the launch.</p></div>
          <div><span className={styles.label}>РЕЗУЛЬТАТ СНАЧАЛА · because → ПОЧЕМУ?</span><p lang="en">We delayed the launch<br /><b>because</b> the system wasn't ready.</p></div>
        </div>
      </section>

      <section className={styles.purpose} aria-labelledby="cause-purpose">
        <header><h2 id="cause-purpose">Причина ≠ цель</h2><p lang="en">We delayed the launch…</p></header>
        <div className={styles.pair}>
          <div><span className={styles.label}>← ПРИЧИНА: ПОЧЕМУ ЭТО СДЕЛАЛИ?</span><p lang="en"><b>because the system wasn't ready.</b></p></div>
          <div><span className={styles.label}>ЦЕЛЬ: ЧЕГО ХОТЕЛИ ДОБИТЬСЯ? →</span><p lang="en"><b>so that we could test it properly.</b></p></div>
        </div>
      </section>

      <section className={styles.tools} aria-label="Как показать результат">
        <div><h2>Покажи, что факт означает дальше</h2>
          <p className={styles.register}><b lang="en">so</b> — разговорно · <b lang="en">as a result</b> — структурно<br /><b lang="en">therefore</b> — чаще формально / письменно</p>
          <p className={styles.example} lang="en">We need another week,<br /><b>which means the launch will move to Friday.</b></p>
        </div>
        <div><h2>Компактно добавь последствие</h2>
          <p className={styles.example} lang="en">The payment issue delayed the release,<br /><b>resulting in several customer complaints.</b></p>
          <p className={styles.note}>Не взаимозаменяемы. <b>because / so полезны.</b> Выбор зависит от контекста.</p>
        </div>
      </section>

      <section className={styles.thinking} aria-labelledby="cause-thinking">
        <h2 id="cause-thinking">Вопросы слушателя: почему? что получилось? что дальше? зачем?</h2>
        <div className={styles.thinkingPath}><ol>{questions.map((question, index) => <li key={question}><span aria-hidden="true">{index + 1}</span>{question}</li>)}</ol><p>→ SHOW THE CONNECTION</p></div>
      </section>

      <section className={styles.practice} aria-labelledby="cause-practice">
        <h2 id="cause-practice">Покажи логику</h2>
        <p className={styles.facts}>Факты: платёжная система дала сбой; команда остановила выпуск; проблему исправили до запуска.</p>
        <p className={styles.example} lang="en">The payment system failed, <b>so the team stopped the release.</b><br /><b>As a result,</b> they had time to fix the issue before launch.</p>
        <div className={styles.answers}><p>Почему остановили выпуск?<br /><b lang="en">Because the payment system failed.</b></p><p>Что это позволило сделать?<br /><b lang="en">They had time to fix the issue.</b></p></div>
      </section>

      <aside className={styles.takeaway} aria-label="Главный вывод"><div><strong>Сильная речь — понятная логика.</strong><p>Не ставь связку между каждой фразой. Покажи связь там, где она нужна.</p></div><p className={styles.takeawayFormula} lang="en">CAUSE → RESULT → CONSEQUENCE</p></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">06 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
