import { A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, FlowArrow, MistakeBox, PracticeBox } from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card14PracticeSystem.module.css';

const learningSteps = [
  ['Слушай', 'общий смысл'], ['Лови блоки', 'I think · we need to'], ['Проверь', 'сверь с текстом'],
  ['Повтори', 'ритм и паузы'], ['Скажи сам', 'измени под себя'], ['Используй', 'в разговоре'],
] as const;

export function Card14PracticeSystem() {
  const card = getCourseCard(14)!;
  return <A4Page cardId={card.id} accent={card.accent} className={styles.practicePage}>
    <CourseHeader card={card} secondaryLabel="Основано на второй части Block 09 — Real Spoken English" />
    <div className={`page-content ${styles.content}`}>
      <MainIdeaBox><strong>Английский становится навыком, когда ты им пользуешься.</strong><p>Слушай → узнавай → повторяй → говори сам.</p></MainIdeaBox>

      <Section title="Знание → повторение → навык" className={styles.learningLoop}>
        <ol className={styles.loopSteps}>{learningSteps.map(([title, note], index) => <li key={title}><span>{index + 1}</span><strong>{title}</strong><p>{note}</p>{index < 5 && <FlowArrow />}</li>)}</ol>
        <svg className={styles.returnPath} viewBox="0 0 660 22" fill="none" aria-hidden="true"><path d="M610 1v8a8 8 0 0 1-8 8H58a8 8 0 0 1-8-8V1m-5 6 5-6 5 6" /></svg>
        <p className={styles.loopNote}>Новый разговор → снова слушай. Цикл повторяется.</p>
      </Section>

      <div className={styles.twoColumns}>
        <Section title="Как слушать" className={styles.detail}>
          <p className={styles.note}>1 — смысл · 2 — знакомые фразы · 3 — детали<br />4 — посмотри текст · 5 — переслушай трудное</p>
          <p className={styles.note}>Не останавливай аудио после каждого слова.</p>
          <div className={styles.chunks} lang="en"><span>I don't think</span><span>we're gonna</span><span>finish today</span></div>
        </Section>
        <Section title="Повторяй за диктором" label="Shadowing" className={styles.detail}>
          <p className={styles.note}>Слушай → повтори после паузы → почти вместе → без аудио → измени под себя.</p>
          <p className={styles.english} lang="en">I don't think we're gonna <b>finish today</b>.</p>
          <p className={styles.english} lang="en">→ I don't think we're gonna <b>launch today</b>.</p>
        </Section>
      </div>

      <Section title="Как поддерживать разговор" className={styles.conversation}>
        <p className={styles.conversationFlow}>Слушай → отреагируй → ответь → добавь причину / пример → спроси ↶</p>
        <p className={styles.note}>Ответ + причина + вопрос собеседнику → снова слушай.</p>
      </Section>

      <div className={styles.tools}>
        <Section title="Полезные реакции" className={styles.detail}>
          <div className={styles.reactions} lang="en"><span>I see.</span><span>That makes sense.</span><span>Let me think.</span><span>What about you?</span></div>
          <p className={styles.note}>Пауза — это нормально.</p>
        </Section>
        <Section title="Переспроси / исправь" className={styles.detail}>
          <p className={styles.english} lang="en">Could you say that again?</p><p className={styles.note}>Можешь повторить?</p>
          <p className={styles.english} lang="en">What I mean is…</p><p className={styles.note}>Я имею в виду…</p>
        </Section>
        <Section title="Если забыл слово" className={styles.detail}>
          <p className={styles.english} lang="en">It's something you use to…</p><p className={styles.english} lang="en">It's similar to…</p>
          <p className={styles.note}>Опиши назначение или сходство и продолжай.</p>
        </Section>
      </div>

      <Section title="20 минут в день" className={styles.daily}>
        <div className={styles.dailySteps}>
          <div><strong>5 МИН · конструкции</strong><p>Повтори фразы</p></div>
          <div><strong>5 МИН · слушание</strong><p>Лови блоки</p></div>
          <div><strong>5 МИН · повторение</strong><p>Повтори ритм</p></div>
          <div><strong>5 МИН · речь</strong><p>Скажи сам</p></div>
        </div>
      </Section>

      <div className={styles.bottomGrid}>
        <Section title="Слушай смысл"><MistakeBox wrong="Переводить каждое слово" correct="Общий смысл + знакомые блоки" /></Section>
        <Section title="Продолжай говорить"><MistakeBox wrong="Ждать идеального предложения" correct="Сказать простую мысль и продолжить" /></Section>
        <Section title="Попробуй сам"><PracticeBox question="Новая фраза: I don't think it's a good idea. Что дальше?">
          <p className={styles.options}>A — записать · B — перевести<br />C — пройти полный цикл</p>
          <p className={styles.answer}>✓ C — повтори → измени → используй</p><p className={styles.english} lang="en">I don't think it's the right time.</p>
        </PracticeBox></Section>
      </div>

      <aside className={styles.takeaway} aria-label="Итог курса">
        <div className={styles.takeawayHeading}><strong>Не пытайся говорить идеально.</strong><span>✓ КУРС ЗАВЕРШЁН <small lang="en">Course Complete</small></span></div>
        <p>Слушай смысловыми блоками, используй знакомые конструкции и продолжай разговор.</p>
        <div className={styles.finalLoop}>ПОНЯТЬ → УСЛЫШАТЬ → ПОВТОРИТЬ → СКАЗАТЬ → ИСПОЛЬЗОВАТЬ ↶</div>
        <p className={styles.finalLine}>Цель — не помнить правило. Цель — знать, как это сказать.</p>
      </aside>
    </div>
    <CourseFooter card={card} previousLabel="Почему живой английский звучит иначе" completionLabel="✓ КУРС ЗАВЕРШЁН" />
  </A4Page>;
}
