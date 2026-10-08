import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card01.module.css';

const positions = [
  { label: 'ФАКТ', sentence: "It's true.", meaning: 'Я подаю это как факт.' },
  { label: 'МНЕНИЕ', sentence: "I think it's true.", meaning: 'Я показываю свою позицию.' },
  { label: 'УВЕРЕННАЯ ПОЗИЦИЯ', sentence: "I believe it's true.", meaning: 'Моя уверенная позиция.' },
  { label: 'ВПЕЧАТЛЕНИЕ', sentence: 'It seems to be true.', meaning: 'Так выглядит по наблюдениям.' },
  { label: 'ВЕРОЯТНОСТЬ', sentence: "It's probably true.", meaning: 'Я считаю это вероятным.' },
  { label: 'ВОЗМОЖНОСТЬ', sentence: 'It may be true.', meaning: 'Я допускаю такую возможность.' },
] as const;

const thinkingQuestions = [
  'Что я хочу сказать?', 'Насколько я уверен?', 'Факт или моя позиция?',
  'Прямо или осторожно?', 'Есть ли оговорка?',
] as const;

const practice = [
  { meaning: 'Скорее всего сработает.', sentence: "It'll probably work." },
  { meaning: 'Допускаю возможность.', sentence: 'It might work.' },
  { meaning: 'Кажется, работает.', sentence: 'It seems to be working.' },
  { meaning: 'Это моё мнение.', sentence: "I think it'll work." },
] as const;

export function Card01() {
  const card = b2C1Cards[0];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>{String(card.number).padStart(2, '0')} / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">C1 начинается не со сложных конструкций, а с более точного выбора смысла.</p>
    </header>

    <div className={`page-content ${styles.content}`}>
      <section className={styles.transition} aria-label="Переход от B2 к C1">
        <div><span className={styles.label}>B2 · ВЫРАЗИТЬ МЫСЛЬ</span><p lang="en">I can express my idea.</p><strong>Я могу выразить мысль.</strong></div>
        <span className={styles.transitionArrow} aria-hidden="true">→</span>
        <div><span className={styles.label}>C1 · УПРАВЛЯТЬ ОТТЕНКОМ</span><p lang="en">I can control how my idea sounds.</p><strong>Я управляю тем, как мысль звучит.</strong></div>
      </section>

      <section className={styles.model} aria-label="От смысла через оттенок к английской форме">
        <ol className={styles.formula}>
          <li><span lang="en">MEANING</span><strong>Мысль: «Это правда.»</strong></li>
          <li><span lang="en">NUANCE</span><strong>Что я хочу показать?</strong></li>
          <li><span lang="en">FORM</span><strong>Точная форма</strong></li>
        </ol>
        <p className={styles.dimensions}>Уверенность · мнение · впечатление · осторожность · дистанция</p>
        <svg className={styles.branches} viewBox="0 0 600 18" preserveAspectRatio="none" aria-hidden="true">
          <path d="M300 0V7M100 18V7H500V18M300 7V18" />
        </svg>
        <ul className={styles.positions} aria-label="Способы выразить отношение к мысли">{positions.map((position) => <li key={position.label}>
          <span className={styles.label}>{position.label}</span>
          <p className={styles.english} lang="en">{position.sentence}</p>
          <p className={styles.meaning}>{position.meaning}</p>
        </li>)}</ul>
        <div className={styles.insight}>
          <p><span>«Как сказать правильно?»</span><span aria-hidden="true">→</span><strong>«Что именно я хочу передать?»</strong></p>
          <p>Все варианты могут быть правильными. Это не шкала вероятности: контекст важен.</p>
        </div>
      </section>

      <div className={styles.secondary}>
        <section className={styles.conversation} aria-labelledby="precision-conversation">
          <h2 id="precision-conversation">Одна идея — разное отношение</h2>
          <p className={styles.baseIdea}><span>«Это хорошая идея.»</span><strong lang="en">It's a good idea.</strong></p>
          <ul lang="en">
            <li>I think it's a good idea.</li>
            <li>It seems like a good idea.</li>
            <li>It sounds like a good idea, <b>although we should test it first.</b></li>
          </ul>
          <p className={styles.note}>Привычное <span lang="en">I think…</span> — часть палитры. Выбирай оттенок.</p>
        </section>

        <section className={styles.clarity} aria-labelledby="precision-clarity">
          <h2 id="precision-clarity" lang="en">C1 ≠ complicated</h2>
          <span className={styles.label} lang="en">COMPLICATED</span>
          <p className={styles.overcomplicated} lang="en">It is my personal consideration that this particular solution could potentially be beneficial.</p>
          <span className={styles.preciseLabel}><span aria-hidden="true">↓</span> <span lang="en">PRECISE &amp; NATURAL</span></span>
          <p className={styles.clearExample} lang="en">I think this could work.</p>
          <p className={styles.clarityWords}>Длиннее ≠ точнее.<br />ТОЧНО · ЕСТЕСТВЕННО · ПОНЯТНО</p>
        </section>
      </div>

      <section className={styles.thinking} aria-label="Вопросы перед выбором формы">
        <h2>Ориентир перед речью:</h2>
        <div className={styles.thinkingPath}>
          <ol>{thinkingQuestions.map((question, index) => <li key={question}>
            <span className={styles.questionNumber} aria-hidden="true">{index + 1}</span>{question}
          </li>)}</ol>
          <p className={styles.chooseForm}>→ выбирай форму</p>
        </div>
      </section>

      <section className={styles.practice} aria-labelledby="precision-practice">
        <header><h2 id="precision-practice">Попробуй выбрать оттенок</h2><p>«Возможно, это сработает.»</p></header>
        <ul>{practice.map((item) => <li key={item.sentence}><span>{item.meaning}</span><span aria-hidden="true">→</span><strong lang="en">{item.sentence}</strong></li>)}</ul>
        <p className={styles.note}>Это возможные варианты, не единственные ответы. <span lang="en">Be working</span> — процесс уже идёт.</p>
      </section>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div><strong>На C1 важно говорить точнее.</strong><p>Сначала реши, что хочешь передать. Потом выбирай форму.</p></div>
        <p className={styles.takeawayFormula} lang="en">MEANING → NUANCE → FORM</p>
        <div className={styles.brandPrinciple}>
          <p><b lang="en">SEE ENGLISH</b><span>увидь разные формы</span></p>
          <p><b lang="en">UNDERSTAND IT</b><span>пойми разницу в смысле</span></p>
          <p><b lang="en">USE IT</b><span>выбери нужную тебе</span></p>
        </div>
      </aside>
    </div>

    <footer className={`course-footer ${styles.footer}`}>
      <span>Visual English Lab</span>
      <span className="course-footer__number">{String(card.number).padStart(2, '0')} / {b2C1Cards.length}</span>
      {next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}
    </footer>
  </A4Page>;
}
