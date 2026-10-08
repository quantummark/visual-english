import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card08.module.css';

const questions = ['Что реально произошло?', 'Какой факт изменю?', 'Когда он произошёл?', 'Какой результат меняется?', 'Когда этот результат?', 'Насколько я уверен?'] as const;

export function Card08() {
  const card = b2C1Cards[7];
  const next = b2C1Cards.find((item) => item.id === card.next);

  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>08 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Сначала увидь, что произошло на самом деле. Потом измени один факт и проследи новую линию событий.</p>
    </header>

    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="alternative-model">
        <h2 id="alternative-model" lang="en">REAL TIMELINE ↔ ALTERNATIVE TIMELINE</h2>
        <div className={styles.timelines}>
          <section aria-label="Реальная линия событий"><h3>РЕАЛЬНОСТЬ</h3><ol>
            <li><span className={styles.label}>PAST · ПРИЧИНА</span><strong lang="en">We didn't act earlier.</strong></li>
            <li><span className={styles.label}>NOW · РЕЗУЛЬТАТ</span><strong lang="en">Things are difficult now.</strong></li>
          </ol></section>
          <section aria-label="Альтернативная линия событий"><h3>АЛЬТЕРНАТИВА</h3><ol>
            <li><span className={styles.label}>PAST · МЕНЯЕМ ОДИН ФАКТ</span><strong lang="en">If we'd acted earlier…</strong></li>
            <li><span className={styles.label}>NOW · ВОЗМОЖНЫЙ РЕЗУЛЬТАТ</span><strong lang="en">…things might be different now.</strong></li>
          </ol></section>
        </div>
        <p className={styles.modelInsight}><b>Причина — в прошлом. Результат — сейчас.</b> Форма следует за временем.</p>
      </section>

      <section aria-labelledby="alternative-job">
        <h2 id="alternative-job">Прошлое решение → жизнь сейчас</h2>
        <p className={styles.reality} lang="en">I took the job. <span>→</span> I live here now.</p>
        <p className={styles.example} lang="en"><b>If I hadn't taken that job,</b> I wouldn't be living here now.</p>
      </section>

      <div className={styles.secondary}>
        <section aria-labelledby="alternative-times"><h2 id="alternative-times">Один старт — разное время результата</h2>
          <p className={styles.example} lang="en">If we'd left earlier…</p>
          <dl className={styles.results}>
            <div><dt>PAST → PAST</dt><dd lang="en">…we would've caught the train.</dd></div>
            <div><dt>PAST → NOW</dt><dd lang="en">…we wouldn't be stuck here now.</dd></div>
          </dl>
        </section>
        <section aria-labelledby="alternative-certainty"><h2 id="alternative-certainty">Уверенность остаётся важной</h2>
          <p className={styles.example} lang="en">If we'd acted earlier,<br />things <b>would / might</b> be different now.</p>
          <p className={styles.note}><b>would</b> — увереннее; <b>might</b> — менее определённо.</p>
        </section>
      </div>

      <section className={styles.method} aria-labelledby="alternative-method">
        <h2 id="alternative-method">Сначала реальность. Потом — один изменённый факт.</h2>
        <ol aria-label="Как построить альтернативу">
          <li><span>1 · REALITY</span><p>Два реальных факта.</p></li>
          <li><span>2 · FLIP ONE PART</span><p>Измени одну причину.</p></li>
          <li><span>3 · CONSEQUENCE</span><p>Что меняется и когда?</p></li>
          <li><span>4 · FORM</span><p>Построй фразу.</p></li>
        </ol>
        <p className={styles.note}>Вместо «Какой это conditional?» спроси: «Когда условие? Когда результат?»</p>
      </section>

      <section className={styles.mistake} aria-labelledby="alternative-mistake">
        <h2 id="alternative-mistake">Не вставляй would have в эту if-часть</h2>
        <div><p lang="en">✕ If we <b>would have acted</b> earlier,<br />things might be different now.</p><p lang="en">✓ If <b>we'd acted</b> earlier,<br />things might be different now.</p></div>
      </section>

      <section className={styles.thinking} aria-labelledby="alternative-thinking">
        <h2 id="alternative-thinking">Увидь время и смысл → BUILD THE ALTERNATIVE</h2>
        <ol>{questions.map((question, index) => <li key={question}><span aria-hidden="true">{index + 1}</span>{question}</li>)}</ol>
      </section>

      <section className={styles.practice} aria-labelledby="alternative-practice">
        <header><h2 id="alternative-practice">Измени прошлое</h2><p>Какой результат возможен сейчас?</p></header>
        <div className={styles.practiceLines}>
          <p><span className={styles.label}>REALITY · PAST → NOW</span><span lang="en">We didn't fix the issue earlier.<br />The system is unstable now.</span></p>
          <p><span className={styles.label}>ALTERNATIVE · PAST → NOW</span><span lang="en">If we'd fixed the issue earlier,<br />the system might be more stable now.</span></p>
        </div>
        <p className={styles.note}>Сначала попробуй сам. Возможный ответ справа: <b>had fixed → might be more stable now.</b></p>
      </section>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div><strong>Измени один факт. Проследи результат.</strong><p>Одна логичная связь. Сначала время и смысл — потом форма.</p></div>
        <p className={styles.takeawayFormula} lang="en">REALITY ↔ ALTERNATIVE</p>
      </aside>
      <p className={styles.stageEnd}>COMPLEX IDEAS · 05 LAYERS → 06 LOGIC → 07 TWO SIDES → 08 ALTERNATIVE <span>Далее: Natural English</span></p>
    </div>

    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">08 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
