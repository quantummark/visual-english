import { A4Page } from '../../../components/A4Page/A4Page';
import { b2C1Cards } from '../cards';
import styles from './Card14.module.css';

const signals = [['WORDS', 'Что сказано?'], ['CONTEXT', 'Что происходит?'], ['TONE', 'Как прозвучало?']] as const;
const stages = [
  { name: 'PRECISION', accent: 'blue', words: 'Meaning · tone · focus' },
  { name: 'COMPLEX IDEAS', accent: 'purple', words: 'Logic · balance · alternatives' },
  { name: 'NATURAL ENGLISH', accent: 'teal', words: 'Partners · patterns · clarity' },
  { name: 'DISCOURSE & CONVERSATION', accent: 'cyan', words: 'Route · speech · intention' },
] as const;

export function Card14() {
  const card = b2C1Cards[13];
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>14 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">На C1 важно понимать не только слова, но и намерение за ними.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="meaning-model">
        <h2 id="meaning-model" lang="en">WORDS + CONTEXT + TONE = REAL MEANING</h2>
        <ul aria-label="Три сигнала для понимания намерения">{signals.map(([name, prompt]) => <li key={name}><strong lang="en">{name}</strong><p>{prompt}</p></li>)}</ul>
        <svg className={styles.converge} viewBox="0 0 600 25" preserveAspectRatio="none" aria-hidden="true"><path d="M100 1V9Q100 15 108 15H300M500 1V9Q500 15 492 15H300M300 1V24M296 20L300 24L304 20" /></svg>
        <p className={styles.intention}><span lang="en">INTENDED MEANING</span> <strong>Что человек хочет передать?</strong></p>
        <p className={styles.note}>Больше подсказок → лучше интерпретация. <b>Это не чтение мыслей.</b></p>
      </section>
      <section className={styles.conversation} aria-labelledby="meaning-launch">
        <h2 id="meaning-launch">Мягкая форма — возможное сильное сомнение</h2>
        <div className={styles.launchBody}><div lang="en"><p><span>A</span>I think we should launch on Friday.</p><p><span>B</span><b>We might want to rethink that.</b></p></div><div><span className={styles.label}>СИТУАЦИЯ + ПОДАЧА</span><p>Нерешённые проблемы; осторожный тон.</p><span className={styles.label}>ВОЗМОЖНОЕ НАМЕРЕНИЕ</span><p lang="en">I have serious concerns about launching on Friday.</p></div></div>
        <p className={styles.note}>Буквально — пересмотреть. Возможно сильное сомнение; единого скрытого перевода нет.</p>
      </section>
      <section className={styles.sameWords} aria-labelledby="meaning-interest"><h2 id="meaning-interest" lang="en">“That's interesting.” — SAME WORDS, DIFFERENT CONTEXT</h2><ul aria-label="Два контекста фразы That's interesting">
        <li><span className={styles.label}>ДРУГ РАССКАЗАЛ НОВОЕ</span><p lang="en">That's interesting — tell me more.</p><p className={styles.note}>Искренний интерес.</p></li>

        <li><span className={styles.label}>ОБСУЖДЕНИЕ ПРЕДЛОЖЕНИЯ</span><p lang="en">That's interesting. I'm not sure it would work for us.</p><p className={styles.note}>Возможна вежливая дистанция.</p></li>
      </ul></section>
      <div className={styles.support}>
      <section className={styles.understatement} aria-labelledby="meaning-understatement"><h2 id="meaning-understatement" lang="en">“That's not ideal.”</h2><p>Кофе остыл — неудобство. База данных упала — серьёзная проблема.</p><p className={styles.note}>Иногда слова преуменьшают масштаб. Смотри на ситуацию.</p></section>
      <section className={styles.check} aria-labelledby="meaning-check"><div><h2 id="meaning-check" lang="en">NOTICE → INTERPRET → CHECK</h2><p>Вероятное намерение ≠ факт. <b>Важно? Уточни.</b></p></div><p className={styles.example} lang="en">Do you mean Friday is too early?</p><p className={styles.note}>Не каждая фраза — намёк; тон не точный код.</p></section>
      </div>
      <section className={styles.practice} aria-labelledby="meaning-practice"><header><h2 id="meaning-practice">Пойми намерение, сохрани осторожность</h2><p>Сначала предположи сам.</p></header><ol aria-label="Три ситуации для интерпретации">
        <li><div lang="en"><p>A: Should we launch tomorrow?</p><p>B: The payment flow is still broken.</p></div><p>Если запуск требует рабочих платежей → <b>вероятно, запускать рано.</b></p></li>
        <li><div lang="en"><p>A: What do you think of the proposal?</p><p>B: That's… interesting.</p></div><p>Точное мнение? <b>Неизвестно.</b> Возможно колебание; уточни или ищи контекст.</p></li>
        <li><div lang="en"><p>A: Do you agree with this approach?</p><p>B: I'm not entirely convinced.</p></div><p><b>Сомнение / осторожное несогласие.</b> Насколько сильное — неясно.</p></li>
      </ol></section>
      <section className={styles.recap} aria-labelledby="meaning-recap"><header><h2 id="meaning-recap">От BUILD ENGLISH к CONTROL ENGLISH</h2><span lang="en">B2 → C1 · COMPLETE</span></header><ol aria-label="Четыре этапа курса">{stages.map((stage, index) => <li key={stage.name} data-accent={stage.accent}><strong lang="en">{index + 1} · {stage.name}</strong><p lang="en">{stage.words}</p></li>)}</ol></section>
      <aside className={styles.takeaway} aria-label="Главный вывод"><strong>Слова — первый слой. Смотри шире. Уточняй.</strong><p lang="en">B2: I can express the idea. → C1: I can control and interpret it.</p><div><span><b lang="en">SEE ENGLISH</b> замечай сигналы</span><span><b lang="en">UNDERSTAND IT</b> связывай с контекстом</span><span><b lang="en">USE IT</b> отвечай осознанно</span></div></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">14 / {b2C1Cards.length}</span><span>Курс завершён ✓</span></footer>
  </A4Page>;
}
