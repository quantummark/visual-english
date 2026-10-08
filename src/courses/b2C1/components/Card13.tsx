import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card13.module.css';

const cycle = [['THINK', 'Ясная часть мысли'], ['SPEAK', 'Начни с неё'], ['ADJUST', 'Уточни, если нужно'], ['CONTINUE', 'Двигай мысль дальше']] as const;
const tools = [
  { label: 'BUY TIME', purpose: 'Возьми секунду', phrase: 'Let me think…' },
  { label: 'CLARIFY', purpose: 'Уточни смысл', phrase: 'What I mean is…' },
  { label: 'REFORMULATE', purpose: 'Скажи иначе', phrase: 'Let me put it another way.' },
  { label: 'CORRECT', purpose: 'Исправь сказанное', phrase: 'Sorry, I meant…' },
] as const;
const steps = ['Начни с ясной части.', 'Нужна секунда? Возьми её.', 'Неточно? Уточни.', 'Забыл слово? Опиши.', 'Изменил мысль? Покажи.', 'Продолжай.'] as const;

export function Card13() {
  const card = b2C1Cards[12];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>13 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Беглая речь — не идеальная речь без пауз. Это умение продолжать мысль.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="loop-model">
        <header><h2 id="loop-model" lang="en">LIVE LOOP</h2><p>Card 12: маршрут. Card 13: адаптация в моменте.</p></header>
        <ol aria-label="Цикл живой речи">{cycle.map(([name, meaning]) => <li key={name}><strong lang="en">{name}</strong><p>{meaning}</p></li>)}</ol>
        <svg className={styles.returnPath} viewBox="0 0 640 24" preserveAspectRatio="none" aria-hidden="true"><path d="M570 1V10Q570 19 560 19H80Q70 19 70 10V1M66 6L70 1L74 6" /></svg>

        <p className={styles.fluency}><b lang="en">FLUENCY ≠ NO PAUSES ≠ MAXIMUM SPEED</b><span>Паузы и ошибки возможны. Главное — ясность и продолжение мысли.</span></p>
      </section>
      <section className={styles.reframe} aria-labelledby="loop-reframe">
        <h2 id="loop-reframe">Уточнить мысль — не значит провалить ответ</h2>
        <ol aria-label="От цены к ценности">
          <li><span className={styles.label} lang="en">START</span><p lang="en">I think the main problem is the price…</p></li>
          <li><span className={styles.label} lang="en">RETHINK</span><p lang="en"><b>Actually,</b> that's not quite what I mean.</p></li>
          <li><span className={styles.label} lang="en">REFRAME</span><p lang="en">The price matters, but the bigger issue is the value people get for it.</p></li>
        </ol>
        <p className={styles.note}><span lang="en">Actually</span> здесь сигнализирует смену мысли. Говорящий уточняет позицию и помогает слушателю следить.</p>
      </section>
      <section className={styles.tools} aria-labelledby="loop-tools"><h2 id="loop-tools">Фраза должна выполнять задачу</h2><ul aria-label="Четыре функции речевых сигналов">{tools.map((tool) => <li key={tool.label}><span className={styles.label} lang="en">{tool.label}</span><strong>{tool.purpose}</strong><p className={styles.example} lang="en">{tool.phrase}</p></li>)}</ul><p className={styles.note}>Тишина допустима. <span lang="en">I mean</span> может уточнять; постоянные повторы затрудняют понимание.</p></section>
      <div className={styles.secondary}>
        <section aria-labelledby="loop-missing"><h2 id="loop-missing">Забыл слово? Опиши и продолжай.</h2><span className={styles.label} lang="en">RECEIPT → DESCRIPTION</span><p className={styles.example} lang="en">I can't remember the word, but it's the paper you get after paying.</p><p className={styles.note}>Что это? Для чего? Где используют? Опиши смысл и продолжай.</p></section>
        <section aria-labelledby="loop-correction"><h2 id="loop-correction">Сначала защити сообщение</h2><p className={styles.example} lang="en">We launched in March—<br /><b>sorry, I meant April.</b></p><p className={styles.note}>Меняет смысл? Исправь. Мелкая языковая неточность не мешает пониманию? Часто продолжай.</p></section>
      </div>
      <section className={styles.start} aria-label="Начни с того, что уже знаешь"><p>Вместо «нужна вся идеальная фраза» → <b>«я знаю достаточно, чтобы начать».</b></p><p lang="en">I'm not sure yet. <span>— тоже честный ответ; мгновенное мнение не обязательно.</span></p></section>
      <section className={styles.thinking} aria-labelledby="loop-thinking"><h2 id="loop-thinking">Ориентир в моменте</h2><ol>{steps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span>{step}</li>)}</ol></section>
      <section className={styles.practice} aria-labelledby="loop-practice">
        <header><h2 id="loop-practice">Уточни, не начиная заново</h2><p lang="en">Why do you think the launch failed?</p></header>
        <p className={styles.example} lang="en">I think the main reason was marketing…</p>
        <p className={styles.note}>Новая мысль: продукт не был готов. Продолжи сам, затем сравни.</p>
        <div className={styles.practiceAnswer} lang="en"><p><b>Actually, let me rephrase that.</b></p><p>Marketing was part of the problem, but I think the bigger issue was that the product wasn't ready yet.</p></div>

      </section>
      <aside className={styles.takeaway} aria-label="Главный вывод"><div><strong>Не жди идеальную фразу. Начни с ясного.</strong><p>Слушатель понимает, что ты имеешь в виду и куда идёшь? Продолжай.</p></div><p className={styles.takeawayFormula} lang="en">THINK → SPEAK<br />ADJUST → CONTINUE</p></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">13 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
