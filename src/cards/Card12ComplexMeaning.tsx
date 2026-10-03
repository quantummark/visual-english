import { A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, FlowArrow, MistakeBox, PracticeBox } from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card12ComplexMeaning.module.css';

export function Card12ComplexMeaning() {
  const card = getCourseCard(12)!;
  return <A4Page cardId={card.id} accent={card.accent} className={styles.meaningPage}>
    <CourseHeader card={card} secondaryLabel="Основано на второй части Block 08 — B2 Structures" />
    <div className={`page-content ${styles.content}`}>
      <MainIdeaBox><strong>B2 — это не «говорить сложнее ради сложности».</strong><p>Это умение выбрать форму, которая точнее передаёт смысл.</p></MainIdeaBox>
      <Section title="Что я хочу сделать с мыслью?">
        <div className={styles.modules}>
          <section className={styles.module} aria-labelledby="card12-result">
            <h3 id="card12-result"><span>1</span> Важно, что произошло</h3>
            <p className={styles.before} lang="en">We fixed the problem. <span>— кто сделал</span></p>
            <FlowArrow direction="down" />
            <p className={styles.mainExample} lang="en">The problem <b>was fixed</b>.</p>
            <p className={styles.note}>Проблема была исправлена. Фокус на результате; кто сделал — не главное.</p>
            <div className={styles.detail}><p className={styles.pattern} lang="en">be + V3 → was fixed / will be fixed</p><p className={styles.note}>V3 — третья форма. Время меняется в <span lang="en">be</span>.</p>
            </div>
          </section>

          <section className={styles.module} aria-labelledby="card12-report">
            <h3 id="card12-report"><span>2</span> Пересказываем слова</h3>
            <p className={styles.before} lang="en">“I need more time.”</p><FlowArrow direction="down" />
            <p className={styles.mainExample} lang="en">He said he <b>needed</b> more time.</p>
            <p className={styles.note}>Он сказал, что ему нужно больше времени.</p>
            <div className={styles.detail}><p className={styles.english} lang="en">He <b>said</b> he was tired.</p><p className={styles.english} lang="en">He <b>told me</b> he was tired.</p></div>
            <p className={styles.note}>Если факт всё ещё верен, время иногда сохраняется.</p>
          </section>

          <section className={styles.module} aria-labelledby="card12-wish">
            <h3 id="card12-wish"><span>3</span> Хотелось бы иначе</h3>
            <p className={styles.mainExample} lang="en">I wish I <b>had</b> more time.</p><p className={styles.note}>Жаль, что времени мало. Сейчас всё иначе.</p>
            <div className={styles.detail}><p className={styles.english} lang="en">I wish I <b>had started</b> earlier.</p><p className={styles.note}>Жаль, что я не начал раньше.</p>
              <p className={styles.english} lang="en">I wish it <b>would stop</b> raining.</p><p className={styles.note}>Хочу, чтобы дождь прекратился.</p>
            </div>
            <div className={styles.hope}><strong><span lang="en">hope</span> <span>— надеюсь, это возможно</span></strong><p className={styles.english} lang="en">I hope I have more time tomorrow.</p></div>
          </section>

          <section className={styles.module} aria-labelledby="card12-extra">
            <h3 id="card12-extra"><span>4</span> Добавляем уточнение</h3>
            <p className={styles.before} lang="en">I spoke to a user. The user had a problem.</p><FlowArrow direction="down" />
            <p className={styles.mainExample} lang="en">I spoke to a user <b>who had a problem</b>.</p><p className={styles.note}>Уточняем пользователя: у него была проблема.</p>
            <div className={styles.relativeWords}><span><b lang="en">who</b> — человек</span><span><b lang="en">that</b> — вещь</span><span><b lang="en">where</b> — место</span></div>
            <div className={styles.detail}><p className={styles.english} lang="en">The file <del>that</del> you sent was useful.</p><p className={styles.note}>Здесь <span lang="en">that</span> можно убрать: действие делает <span lang="en">you</span>. В <span lang="en">who called me</span> слово <span lang="en">who</span> оставляем: оно делает действие.</p></div>
          </section>
        </div>
      </Section>

      <div className={styles.mistakes}>
        <Section title="tell + человек"><MistakeBox wrong="She said me she was tired." correct="She told me she was tired." explanation="tell показывает, кому сказали." /></Section>
        <Section title="Уточняем человека"><MistakeBox wrong="The user which called me…" correct="The user who called me…" explanation="Для человека используем who." /></Section>
        <Section title="Сейчас всё иначе"><MistakeBox wrong="I wish I have more time." correct="I wish I had more time." explanation="had показывает другую реальность сейчас." /></Section>
      </div>

      <Section title="Попробуй сам">
        <PracticeBox question="Объедини две мысли: добавь информацию о человеке.">
          <div className={styles.practiceFlow}><p className={styles.english} lang="en">I met a developer.<br />He works with Flutter.</p><FlowArrow /><div><p className={styles.answer} lang="en">I met a developer <b>who works with Flutter</b>.</p><p className={styles.note}>Я встретил разработчика, который работает с Flutter.</p></div></div>
        </PracticeBox>
      </Section>

      <aside className={styles.takeaway} aria-label="Главный вывод">
        <div className={styles.takeawayHeading}><strong>Смысл → подходящий шаблон</strong><p>Не сложнее форма. Точнее смысл.</p></div>
        <div className={styles.fourPaths}>
          <div><strong>Важен результат</strong><p lang="en">The problem was fixed.</p></div>
          <div><strong>Пересказываю слова</strong><p lang="en">He said he needed more time.</p></div>
          <div><strong>Хотелось бы иначе</strong><p lang="en">I wish I had more time.</p></div>
          <div><strong>Уточняю</strong><p lang="en">a user who had a problem</p></div>
        </div>
      </aside>
    </div>
    <CourseFooter card={card} previousLabel="Реальность, возможность и «если бы»" nextLabel="Почему живой английский звучит иначе" />
  </A4Page>;
}
