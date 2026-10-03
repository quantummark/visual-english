import { A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, FlowArrow, MistakeBox, PracticeBox } from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card13RealSpokenEnglish.module.css';

function LinkedWords({ words }: { words: readonly string[] }) {
  return <span className={styles.linkedWords} lang="en">{words.map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}</span>;
}

export function Card13RealSpokenEnglish() {
  const card = getCourseCard(13)!;
  return <A4Page cardId={card.id} accent={card.accent} className={styles.spokenPage}>
    <CourseHeader card={card} secondaryLabel="Основано на первой части Block 09 — Real Spoken English" />
    <div className={`page-content ${styles.content}`}>
      <MainIdeaBox><strong>Можно знать все слова — и не узнать фразу на слух.</strong><p>В живой речи слова звучат не изолированно, а соединяются в поток.</p></MainIdeaBox>

      <section className={styles.transformation} aria-label="Написанная фраза и её возможное звучание">
        <div className={styles.writtenSpoken}>
          <div><h2>НА БУМАГЕ</h2><p lang="en">What are you going to do?</p></div><FlowArrow />
          <div><h2>В РЕЧИ — может звучать ближе к:</h2><p className={styles.soundExample} lang="en">Whaddaya gonna do?</p></div>
        </div>
        <p className={styles.note}><b>Так не нужно писать.</b> Это приблизительная подсказка для слуха. Узнавай, как меняется знакомая фраза; звучание зависит от говорящего, акцента и скорости.</p>
      </section>

      <div className={styles.modules}>
        <Section title="1. Сокращаем" className={styles.module}>
          <div className={styles.contractions} lang="en"><p>I am → <b>I'm</b></p><p>you are → <b>you're</b></p><p>I will → <b>I'll</b></p><p>I would → <b>I'd</b></p><p>do not → <b>don't</b></p><p>would have → <b>would've</b></p></div>
          <p className={styles.note}>Обычные сокращения полезны и для собственной речи. <span lang="en">would've</span> = <span lang="en">would have</span>.</p>
        </Section>
        <Section title="2. Ослабляем" className={styles.module}>
          <p className={styles.note}>В быстрой неформальной речи может слышаться:</p>
          <div className={styles.reductions} lang="en"><p><span>going to → </span><b>gonna</b></p><p><span>want to → </span><b>wanna</b></p><p><span>have to → </span><b>hafta</b></p></div>
          <p className={styles.note}>Сначала узнавай. Подражать не обязательно.</p>
          <p className={styles.note}>С человеком: <b lang="en">I want you to leave.</b></p>
        </Section>
        <Section title="3. Выделяем главное" className={styles.module}>
          <p className={styles.stressExample} lang="en"><span>I</span> <b>NEED</b> <span>more</span> <b>TIME.</b></p>
          <p className={styles.note}>Смысловые слова обычно звучат сильнее. Маленькие слова <span lang="en">a, to, of, can</span> часто ослабевают.</p>
        </Section>
        <Section title="4. Соединяем" className={styles.module}>
          <LinkedWords words={['turn', 'it', 'on']} />
          <p className={styles.note}>Конец слова может переходить в начало следующего: одна звуковая группа.</p>
          <div className={styles.thoughtGroups} lang="en"><span>I think</span><span>we should wait</span><span>until tomorrow</span></div>
          <p className={styles.note}>Говорим небольшими смысловыми блоками.</p>
        </Section>
      </div>

      <aside className={styles.americanT} aria-label="Особенность американской речи">
        <strong>Особенность американской речи</strong><p className={styles.english} lang="en">wa<b>t</b>er · be<b>tt</b>er · ci<b>t</b>y</p>
        <p className={styles.note}>В этих словах американское <span lang="en">t</span> может напоминать быстрый мягкий <span lang="en">d</span>. Звучание зависит от акцента.</p>
      </aside>

      <Section title="Как слушать живую речь" className={styles.strategy}>
        <ol><li>Лови сильные слова</li><li>Узнавай знакомые фразы</li><li>Понимай общий смысл</li></ol>
        <p className={styles.note}>Сначала смысл, потом детали. Маленькие слова можно расслышать позже.</p>
      </Section>

      <div className={styles.bottomGrid}>
        <Section title="Не по одному слову"><MistakeBox wrong="Услышать каждое слово идеально" correct="Сильные слова + блоки + смысл" /></Section>
        <Section title="would've = would have"><MistakeBox wrong="I would of called." correct="I would've called." explanation="Это would have." /></Section>
        <Section title="Попробуй сам"><PracticeBox question="Слышится «hafta go». Какая фраза?">
          <p className={styles.options} lang="en">have to go / have a go / had to go</p><p className={styles.answer} lang="en">✓ have to go</p><p className={styles.note}>Мне нужно идти.</p>
        </PracticeBox></Section>
      </div>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div className={styles.takeawayHeading}><strong>Живая речь — поток, а не отдельные слова.</strong><p>Лови смысловые блоки.</p></div>
        <div className={styles.fourProcesses}>
          <div><strong>Сокращаем</strong><p lang="en">I'm / I'll / would've</p></div><span>+</span>
          <div><strong>Ослабляем</strong><p lang="en">going to ≈ gonna</p></div><span>+</span>
          <div><strong>Выделяем</strong><p lang="en">I <b>NEED</b> more <b>TIME</b>.</p></div><span>+</span>
          <div><strong>Соединяем</strong><LinkedWords words={['turn', 'it', 'on']} /></div>
        </div>
      </aside>
    </div>
    <CourseFooter card={card} previousLabel="Как выражать более сложные мысли" nextLabel="Как научиться понимать и говорить" />
  </A4Page>;
}
