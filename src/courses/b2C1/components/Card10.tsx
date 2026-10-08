import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card10.module.css';

const questions = ['Слова или смысл?', 'Есть английский паттерн?', 'Знаю готовый блок?', 'Можно сказать проще?', 'Подходит этому контексту?'] as const;

export function Card10() {
  const card = b2C1Cards[9];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>10 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Сохрани смысл. Но не заставляй английский копировать русскую структуру.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="rebuild-model">
        <h2 id="rebuild-model" lang="en">RUSSIAN IDEA → MEANING → ENGLISH PATTERN</h2>
        <ol aria-label="Пересобери мысль о симпатии">
          <li><span className={styles.label}>РУССКАЯ МЫСЛЬ</span><strong>Мне это очень нравится.</strong><p className={styles.copied} lang="en">✕ I very like it.</p></li>
          <li><span className={styles.label}>ЧТО Я ХОЧУ СКАЗАТЬ?</span><strong>Выразить сильную симпатию.</strong><p>Смысл остаётся.</p></li>
          <li><span className={styles.label}>АНГЛИЙСКИЙ ПАТТЕРН</span><strong lang="en">I really like it.</strong><p lang="en">really + like</p><p>Своя конструкция.</p></li>
        </ol>
        <p className={styles.modelInsight}><b>Не замена слов, а пересборка мысли.</b> В Card 09 были соседи слова; здесь — паттерн целой идеи.</p>
      </section>
      <div className={styles.work}>
        <section aria-labelledby="rebuild-propose"><h2 id="rebuild-propose">Проблема в паттерне, не в propose</h2><p className={styles.copied} lang="en">✕ I propose you to change it.</p><p className={styles.example} lang="en">✓ I suggest changing it.<br />✓ I propose that we change it.</p><p className={styles.note}>Propose — корректное слово. Выбирай его естественную конструкцию.</p></section>
        <section aria-labelledby="rebuild-launch"><h2 id="rebuild-launch">«Предлагаю перенести запуск»</h2><span className={styles.label}>ДЕЙСТВИЕ: ПРЕДЛОЖИТЬ</span><p className={styles.example} lang="en">I think we should delay the launch.<br /><b>I'd suggest delaying the launch.</b></p><p className={styles.note}>Общее действие одно; второй вариант звучит мягче. Смысл, тон и контекст выбирают форму.</p></section>
      </div>
      <section className={styles.function} aria-label="Сначала функция"><p>«Я не уверен, что это хорошая идея» → <b>мягко возразить</b></p><p className={styles.example} lang="en">I'm not sure that's a good idea.</p></section>
      <aside className={styles.nuance} aria-label="Перевод может помогать"><p><b>Перевод может помогать понять смысл.</b> Автоматически копировать структуру — ненадёжный метод.</p><p>Иногда формы совпадают: <span lang="en">I need more time.</span> Дословный результат не всегда ошибочен.</p></aside>
      <section className={styles.habit} aria-labelledby="rebuild-habit"><h2 id="rebuild-habit">Услышал естественную фразу? Сохрани весь паттерн.</h2><p lang="en">doubt → <b>I have some doubts about…</b> · point → <b>There's no point in…</b></p></section>
      <section className={styles.thinking} aria-labelledby="rebuild-thinking"><h2 id="rebuild-thinking">Вместо «перевести каждое слово» → REBUILD THE IDEA</h2><div><ol>{questions.map((question, index) => <li key={question}><span aria-hidden="true">{index + 1}</span>{question}</li>)}</ol><p>→ MEANING FIRST</p></div></section>
      <section className={styles.practice} aria-labelledby="rebuild-practice">
        <header><h2 id="rebuild-practice">Пересобери смысл</h2><p>Сначала попробуй сам; ответы ниже.</p></header>
        <ol><li><span>Я согласен.</span><span lang="en">I am agree. → <b>I agree.</b></span></li><li><span>Это зависит от ситуации.</span><span lang="en">It depends from the situation. → <b>It depends on the situation.</b></span></li><li><span>Предлагаю проверить ещё раз.</span><span lang="en"><b>I suggest checking it again.</b><br />I think we should check it again.</span></li></ol>
        <p className={styles.note}>В последнем примере два естественных варианта. Единственного обязательного перевода нет.</p>
      </section>
      <aside className={styles.takeaway} aria-label="Главный вывод"><div><strong>Смысл остаётся. Форма меняется.</strong><p>Сначала пойми, что хочешь сказать. Затем строй от английского паттерна.</p></div><p className={styles.takeawayFormula} lang="en">MEANING → PATTERN → NATURAL ENGLISH</p></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">10 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
