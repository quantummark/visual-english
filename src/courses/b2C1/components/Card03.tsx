import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card03.module.css';

const toneVersions = [
  { label: 'ПРЯМО', sentence: "You're wrong." },
  { label: 'НЕЙТРАЛЬНЕЕ', sentence: "I don't think that's right." },
  { label: 'ОСТОРОЖНО', sentence: "I'm not sure that's quite right." },
  { label: 'ДИПЛОМАТИЧНО', sentence: "I can see your point, although I'd look at it differently." },
] as const;

const thinkingQuestions = [
  'Что я хочу сказать?', 'Ситуация чувствительна?', 'Нужно сказать прямо?',
  'Нужно больше пространства?', 'Смысл всё ещё понятен?',
] as const;

const practiceOptions = [
  { label: 'A · DIRECT', sentence: "I don't think this will work." },
  { label: 'B · MORE DIPLOMATIC', sentence: "I'm not sure this will work as expected." },
  { label: 'C · ACKNOWLEDGE + DIFFER', sentence: 'I see your point, but I think we may need another approach.' },
] as const;

export function Card03() {
  const card = b2C1Cards[2];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>{String(card.number).padStart(2, '0')} / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Одна и та же мысль может звучать прямо, осторожно или дипломатично.</p>
    </header>

    <div className={`page-content ${styles.content}`}>
      <section className={styles.model} aria-labelledby="tone-model">
        <h2 id="tone-model" className={styles.formula} lang="en"><span>MESSAGE</span><i aria-hidden="true">+</i><span>DISTANCE</span><i aria-hidden="true">=</i><span>TONE</span></h2>
        <div className={styles.distanceDiagram}>
          <div className={styles.messageHub}>
            <span className={styles.label}>ОДНА МЫСЛЬ</span>
            <strong>«Я не согласен.»</strong>
            <p>B2: один привычный тон.<br />C1: больше вариантов.</p>
          </div>
          <ul className={styles.toneVersions} aria-label="Варианты дистанции и тона">{toneVersions.map((version) => <li key={version.label}>
            <span className={styles.label}>{version.label}</span><strong lang="en">{version.sentence}</strong>
          </li>)}</ul>
        </div>
        <div className={styles.insight}>
          <p>Прямо ≠ неправильно. Мягко ≠ всегда лучше.<br /><b>Главное — выбрать подходящий тон.</b></p>
          <p><b>Смягчить ≠ скрыть мысль.</b><br />Ясный смысл + мягче подача.</p>
        </div>
      </section>

      <div className={styles.support}>
        <section className={styles.work} aria-labelledby="tone-work">
          <h2 id="tone-work">Работа: та же критика, другой тон</h2>
          <ul lang="en"><li>This won't work.</li><li>I'm not sure this will work.</li><li>It might be worth revisiting this part.</li></ul>
          <p className={styles.note}>Последний вариант — предложение пересмотреть, а не команда. Мысль должна оставаться ясной.</p>
          <p className={styles.command} lang="en">Check this again. <span aria-hidden="true">→</span><br /><b>It might be worth checking this again.</b></p>
        </section>
        <section className={styles.acknowledge} aria-labelledby="tone-acknowledge">
          <h2 id="tone-acknowledge" lang="en">ACKNOWLEDGE → DIFFER</h2>
          <p className={styles.example} lang="en"><b>I see your point,</b> but…</p>
          <p className={styles.note}>Понимаю твою позицию → вижу иначе.</p>
          <p className={styles.example} lang="en">I wouldn't <b>necessarily</b> say that.</p>
          <p className={styles.note}>Не отвергаю резко — показываю другой взгляд.</p>
          <p className={styles.signals} lang="en">quite · not entirely · not necessarily · might · could</p>
          <p className={styles.note}>Маленькие сигналы создают дистанцию. Они не взаимозаменяемы: контекст меняет смысл.</p>
        </section>
      </div>

      <section className={styles.smallSignals} aria-label="Как маленькие слова меняют тон">
        <p lang="en">That's wrong. <span aria-hidden="true">→</span> That's not <b>quite</b> right.</p>
        <p lang="en">I disagree. <span aria-hidden="true">→</span> I don't <b>entirely</b> agree.</p>
      </section>

      <section className={styles.contexts} aria-label="Тон зависит от ситуации">
        <div><span className={styles.label}>ЭКСТРЕННО — ПРЯМО</span><p lang="en">Stop!</p></div>
        <div><span className={styles.label}>КОМАНДА — БОЛЬШЕ ДИСТАНЦИИ</span><p lang="en">I'm not sure this approach will work.</p></div>
        <div><span className={styles.label}>ОБРАТНАЯ СВЯЗЬ — С ЗАБОТОЙ</span><p lang="en">I think this part could be clearer.</p></div>
      </section>

      <section className={styles.thinking} aria-labelledby="tone-thinking">
        <h2 id="tone-thinking">Перед речью: насколько прямо я хочу это сказать?</h2>
        <div className={styles.thinkingPath}>
          <ol>{thinkingQuestions.map((question, index) => <li key={question}>
            <span aria-hidden="true">{index + 1}</span>{question}
          </li>)}</ol>
          <p className={styles.chooseTone}>→ выбирай тон</p>
        </div>
      </section>

      <section className={styles.practice} aria-labelledby="tone-practice">
        <header><h2 id="tone-practice">Выбери тон</h2><p>Коллега предлагает решение, но ты считаешь, что оно не сработает.</p></header>
        <ul>{practiceOptions.map((option) => <li key={option.label}>
          <span className={styles.label} lang="en">{option.label}</span><span lang="en">{option.sentence}</span>
        </li>)}</ul>
        <p className={styles.answer}>Чувствительное обсуждение? <b>B или C.</b> Контекст решает: иногда прямой вариант тоже правильный.</p>
      </section>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div><strong>Реши, насколько прямо это сказать.</strong><p>Сохрани смысл. Выбери дистанцию. Контролируй тон.</p></div>
        <p className={styles.takeawayFormula} lang="en">MESSAGE → DISTANCE → TONE</p>
        <div className={styles.brandPrinciple}>
          <p><b lang="en">SEE ENGLISH</b><span>увидь разные формы</span></p>
          <p><b lang="en">UNDERSTAND IT</b><span>почувствуй тон</span></p>
          <p><b lang="en">USE IT</b><span>выбери дистанцию</span></p>
        </div>
      </aside>
    </div>

    <footer className={`course-footer ${styles.footer}`}>
      <span>Visual English Lab</span><span className="course-footer__number">{String(card.number).padStart(2, '0')} / {b2C1Cards.length}</span>
      {next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}
    </footer>
  </A4Page>;
}
