import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card02.module.css';

const certaintyZones = [
  { label: 'ЗНАЮ / УТВЕРЖДАЮ', examples: ['He is at home.'] },
  { label: 'СИЛЬНЫЙ ВЫВОД', examples: ['He must be at home.'] },
  { label: 'СКОРЕЕ ВСЕГО', examples: ["He's probably at home.", "He's likely to be at home."] },
  { label: 'ВОЗМОЖНО', examples: ['He may be at home.', 'He might be at home.'] },
  { label: 'НЕ УВЕРЕН', examples: ["I'm not sure he's at home."] },
] as const;

const launchAnswers = [
  { sentence: 'Yes, it will.', meaning: 'Утверждаю.' },
  { sentence: 'It should happen on Friday.', meaning: 'По ожиданиям.' },
  { sentence: "It'll probably happen on Friday.", meaning: 'Вероятно.' },
  { sentence: 'It might happen on Friday.', meaning: 'Возможно.' },
  { sentence: "I'm not sure it'll happen on Friday.", meaning: 'Не уверен.' },
] as const;

const thinkingQuestions = [
  'Что я знаю?', 'Есть ли доказательства?',
  'Вывод или предположение?', 'Насколько готов утверждать?',
] as const;

export function Card02() {
  const card = b2C1Cards[1];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>{String(card.number).padStart(2, '0')} / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Английский показывает не только мысль, но и то, насколько уверенно ты её говоришь.</p>
    </header>

    <div className={`page-content ${styles.content}`}>
      <section className={styles.map} aria-labelledby="certainty-map">
        <header className={styles.mapHeading}>
          <div><h2 id="certainty-map" lang="en">ZONES OF CERTAINTY</h2><p>«Где он?»</p></div>
          <span className={styles.label} lang="en">NUANCE → CERTAINTY</span>
        </header>
        <dl className={styles.zones}>{certaintyZones.map((zone) => <div key={zone.label}>
          <dt>{zone.label}</dt>
          <dd className={styles.zoneExamples} lang="en">{zone.examples.map((sentence) => <strong key={sentence}>{sentence}</strong>)}</dd>
        </div>)}</dl>
        <p className={styles.mapNote}>Это карта позиции говорящего, не точная шкала. Контекст меняет оттенок.</p>
      </section>

      <section className={styles.evidence} aria-labelledby="certainty-evidence">
        <header><h2 id="certainty-evidence">Факт ≠ сильный вывод</h2><p lang="en">He is at home. <span aria-hidden="true">≠</span> He must be at home.</p></header>
        <div className={styles.evidencePair}>
          <div>
            <p className={styles.evidenceContext} lang="en">His car is outside. The lights are on.</p>
            <p className={styles.conclusion} lang="en"><span aria-hidden="true">→</span> He must be at home.</p>
            <p className={styles.explanation}>Я не видел его дома, но делаю сильный вывод.</p>
          </div>
          <div>
            <p className={styles.evidenceContext} lang="en">He's on a flight to Berlin.</p>
            <p className={styles.conclusion} lang="en"><span aria-hidden="true">→</span> He can't be at home.</p>
            <p className={styles.explanation}>По тому, что знаю, дома быть не может.</p>
          </div>
        </div>
      </section>

      <div className={styles.situations}>
        <section className={styles.expectation} aria-labelledby="certainty-expectation">
          <h2 id="certainty-expectation">Вероятно / по ожиданиям</h2>
          <p className={styles.example} lang="en">It's <b>probably</b> going to rain.</p>
          <p className={styles.example} lang="en">It's <b>likely</b> to rain.</p>
          <p className={styles.explanation}>Вероятно, но формы строятся по-разному.</p>
          <p className={styles.expectedExample} lang="en">The package <b>should</b> arrive tomorrow.</p>
          <p className={styles.explanation}>Здесь <span lang="en">should</span> — ожидание, не совет.</p>
        </section>
        <section className={styles.launch} aria-labelledby="certainty-launch">
          <h2 id="certainty-launch" lang="en">Will the launch happen on Friday?</h2>
          <ul>{launchAnswers.map((answer) => <li key={answer.sentence}>
            <span lang="en">{answer.sentence}</span><span>{answer.meaning}</span>
          </li>)}</ul>
        </section>
      </div>

      <div className={styles.possibilityRow}>
        <section aria-labelledby="certainty-possibility">
          <h2 id="certainty-possibility">Допускаю, а не утверждаю</h2>
          <ul className={styles.possibilities} lang="en"><li>It may work.</li><li>It might work.</li><li>It could work.</li></ul>
          <p className={styles.explanation}>Контекст, тон и форма меняют оттенок.</p>
        </section>
        <section className={styles.mistake} aria-labelledby="certainty-mistake">
          <h2 id="certainty-mistake">Типичная ошибка: фиксированные проценты</h2>
          <p className={styles.wrong}><span aria-label="Неверно">✕</span> <s lang="en">must = 90% · may = 50% · might = 30%</s></p>
          <p className={styles.explanation}>Лучше: сначала понять позицию говорящего.</p>
          <p className={styles.positionWords} lang="en">FACT · INFERENCE · LIKELY · POSSIBLE</p>
        </section>
      </div>

      <section className={styles.otherForms} aria-label="Другие способы выразить позицию">
        <h2>Не только модальные формы</h2>
        <p lang="en">It seems to be working.</p><p lang="en">There's a good chance it'll work.</p>
      </section>

      <section className={styles.thinking} aria-labelledby="certainty-thinking">
        <h2 id="certainty-thinking">Перед речью</h2>
        <ol>{thinkingQuestions.map((question, index) => <li key={question}>
          <span aria-hidden="true">{index + 1}</span>{question}
        </li>)}</ol>
        <p className={styles.chooseForm}>→ выбираю форму</p>
      </section>

      <section className={styles.practice} aria-labelledby="certainty-practice">
        <header><h2 id="certainty-practice">Выбери сильный вывод</h2><p>Машина Джона у дома, свет включён. Самого Джона ты не видел.</p></header>
        <ol type="A" className={styles.options} lang="en"><li>John is at home.</li><li>John must be at home.</li><li>John might be at home.</li></ol>
        <p className={styles.answer}><b lang="en">B · John must be at home.</b><span>Ты делаешь сильный вывод, а не сообщаешь известный факт.</span></p>
        <p className={styles.littleEvidence}>Мало информации? <span aria-hidden="true">→</span> <b lang="en">John might be at home.</b></p>
      </section>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div><strong>Насколько я уверен — и почему?</strong><p>Не начинай с <span lang="en">must / may / might</span>. Сначала — смысл.</p></div>
        <p className={styles.takeawayFormula} lang="en">MEANING → CERTAINTY → FORM</p>
        <div className={styles.brandPrinciple}>
          <p><b lang="en">SEE ENGLISH</b><span>увидь позиции</span></p>
          <p><b lang="en">UNDERSTAND IT</b><span>пойми основания</span></p>
          <p><b lang="en">USE IT</b><span>выбери форму</span></p>
        </div>
      </aside>
    </div>

    <footer className={`course-footer ${styles.footer}`}>
      <span>Visual English Lab</span><span className="course-footer__number">{String(card.number).padStart(2, '0')} / {b2C1Cards.length}</span>
      {next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}
    </footer>
  </A4Page>;
}
