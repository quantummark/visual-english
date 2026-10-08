import { A4Page } from '../../../components/A4Page/A4Page';
import { courseCardPath } from '../../coursePaths';
import { b2C1Cards } from '../cards';
import styles from './Card09.module.css';

const partners = [
  { word: 'make', phrase: 'make a decision', meaning: 'принять' },
  { word: 'reach', phrase: 'reach a decision', meaning: 'прийти к решению' },
  { word: 'reconsider', phrase: 'reconsider a decision', meaning: 'пересмотреть' },
  { word: 'difficult', phrase: 'a difficult decision', meaning: 'трудное' },
  { word: 'final', phrase: 'a final decision', meaning: 'окончательное' },
] as const;
const questions = ['Что значит слово?', 'С каким глаголом?', 'Какие прилагательные?', 'Есть готовый блок?', 'Мои 2–3 предложения?'] as const;

export function Card09() {
  const card = b2C1Cards[8];
  const next = b2C1Cards.find((item) => item.id === card.next);
  return <A4Page cardId={card.id} accent={card.accent} className={styles.page}>
    <header className={`course-header ${styles.header}`}>
      <div className="course-header__top"><span>B2 → C1</span><span>09 / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
      <p className="course-subtitle">Чтобы говорить естественно, мало знать значение слова. Важно знать, с чем оно обычно используется.</p>
    </header>
    <div className={`page-content ${styles.content}`}>
      <p className={styles.transition}><span>COMPLEX IDEAS · как построить мысль?</span><b>→</b><span>NATURAL ENGLISH · как её естественно выразить?</span></p>
      <section className={styles.model} aria-labelledby="partners-model">
        <h2 id="partners-model" lang="en">WORD → NATURAL PARTNERS → PHRASE</h2>
        <div className={styles.network}>
          <div className={styles.word}><span className={styles.label}>ОДНО СЛОВО</span><strong lang="en">DECISION</strong><p>решение</p><span className={styles.label}>СЕМЬЯ СОЧЕТАНИЙ →</span></div>
          <ul aria-label="Пять партнёров слова decision">{partners.map((partner) => <li key={partner.word}><span lang="en">{partner.word}</span><div><strong lang="en">{partner.phrase}</strong><span>{partner.meaning}</span></div></li>)}</ul>
        </div>
        <p className={styles.modelInsight}>Значение — для понимания. <b>Соседи — для речи.</b> Это сеть вариантов, а не один обязательный партнёр.</p>
      </section>
      <section className={styles.types} aria-labelledby="partners-types">
        <h2 id="partners-types">Соседи бывают разными</h2>
        <div>
          <section><h3>ДЕЙСТВИЕ + ПРЕДМЕТ</h3><ul lang="en"><li><b>meet</b> a deadline</li><li><b>take</b> responsibility</li><li><b>solve</b> a problem</li></ul></section>
          <section><h3>ОПИСАНИЕ + ПРЕДМЕТ</h3><ul lang="en"><li><b>heavy</b> rain</li><li><b>strong</b> evidence</li><li><b>serious</b> problem</li></ul></section>
          <section><h3>КАК / НАСКОЛЬКО + ПРИЗНАК</h3><ul lang="en"><li><b>highly</b> likely</li><li><b>deeply</b> concerned</li><li><b>widely</b> available</li></ul></section>
        </div>
        <p className={styles.note}><span lang="en">strong rain</span> понятно, но непривычно. В обычном описании погоды естественнее <b lang="en">heavy rain.</b></p>
      </section>
      <section className={styles.family} aria-labelledby="partners-family">
        <h2 id="partners-family">Не ищи глагол отдельно — сохрани семью слова</h2>
        <p><span className={styles.label}>DEADLINE ≠ ТОЛЬКО «СРОК»</span><span lang="en"><b>meet</b> a deadline · <b>miss</b> a deadline · a <b>tight</b> deadline · <b>extend</b> the deadline</span></p>
      </section>
      <section className={styles.chunks} aria-labelledby="partners-chunks">
        <h2 id="partners-chunks">Готовый блок → закончи свою мысль</h2>
        <ul aria-label="От слов к готовым блокам">
          <li><span lang="en">reason</span><b>→</b><strong lang="en">The main reason is…</strong></li>
          <li><span lang="en">chance</span><b>→</b><strong lang="en">There's a good chance…</strong></li>
          <li><span lang="en">point</span><b>→</b><strong lang="en">I see your point, but…</strong></li>
        </ul>
        <p className={styles.example} lang="en"><b>I see your point, but</b> I'm not sure this will work.</p>
      </section>
      <section className={styles.context} aria-label="Контекст важнее сложного слова"><p>Обычные слова тоже дают точную речь. <b>Сочетание и стиль выбирай по контексту.</b></p></section>
      <section className={styles.thinking} aria-labelledby="partners-thinking">
        <h2 id="partners-thinking">Новое слово → LEARN THE FAMILY</h2>
        <div><ol>{questions.map((question, index) => <li key={question}><span aria-hidden="true">{index + 1}</span>{question}</li>)}</ol><p>→ USE THE PHRASE</p></div>
        <p className={styles.example} lang="en">We need to <b>make a decision</b> today. · It was <b>a difficult decision.</b></p>
      </section>
      <section className={styles.practice} aria-labelledby="partners-practice">
        <header><h2 id="partners-practice">Выбери естественного соседа</h2><p>Из предложенных вариантов</p></header>
        <ol><li><strong lang="en">___ a decision</strong><span lang="en">A do · B make · C build</span><p lang="en">→ <b>make a decision</b></p></li><li><strong lang="en">___ a deadline</strong><span lang="en">A meet · B catch · C take</span><p lang="en">→ <b>meet a deadline</b></p></li></ol>
        <p className={styles.extension}>Теперь используй <b lang="en">take responsibility</b> в своей фразе.<br />Например: <span lang="en">He <b>took responsibility for</b> the mistake.</span></p>
      </section>
      <aside className={styles.takeaway} aria-label="Главный вывод"><div><strong>Учи слово вместе с его соседями.</strong><p>Меньше сборки по одному слову — больше готовой опоры для речи.</p></div><p className={styles.takeawayFormula} lang="en">WORD → PARTNERS → NATURAL ENGLISH</p></aside>
    </div>
    <footer className={`course-footer ${styles.footer}`}><span>Visual English Lab</span><span className="course-footer__number">09 / {b2C1Cards.length}</span>{next && <a href={courseCardPath({ slug: 'b2-c1' }, next.number)}>Далее → {next.title}</a>}</footer>
  </A4Page>;
}
