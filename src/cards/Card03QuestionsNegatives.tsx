import { Fragment, type ReactNode } from 'react';
import {
  A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section,
  MistakeBox, PracticeBox, FlowArrow,
} from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card03QuestionsNegatives.module.css';

function Sentence({ children }: { children: ReactNode }) {
  return <p className={styles.sentence} lang="en">{children}</p>;
}

function QuestionPieces({ pieces }: { pieces: readonly string[] }) {
  return (
    <p className={styles.questionPieces} lang="en">
      {pieces.map((piece, index) => (
        <Fragment key={piece}>
          {index > 0 && <span className={styles.plus} aria-hidden="true"> + </span>}
          <span className={index === 0 ? styles.questionWord : styles.piece}>{piece}</span>
          {index < pieces.length - 1 && ' '}
        </Fragment>
      ))}
    </p>
  );
}

export function Card03QuestionsNegatives() {
  const card = getCourseCard(3)!;
  return (
    <A4Page cardId={card.id} accent={card.accent} className={styles.questionsPage}>
      <CourseHeader card={card} secondaryLabel="Основано на Block 02 — Questions & Negatives" />
      <div className={`page-content ${styles.content}`}>
        <MainIdeaBox>
          <strong>Сначала найди, какой тип предложения перед тобой.</strong>
          <div className={styles.ideaRules}><p>Обычный глагол → добавляем помощника.</p><p><span lang="en">am / is / are</span> → сами меняют позицию.</p></div>
        </MainIdeaBox>

        <div className={styles.systems} aria-label="Две системы: добавляем помощника или переставляем am, is, are">
          <section className={styles.system}>
            <h2>Обычный глагол</h2>
            <p className={styles.vocabulary} lang="en">work / live / like / need / know...</p>
            <p className={styles.decision}>Есть обычное действие? → <strong lang="en">DO / DOES / DID</strong></p>
            <Sentence>You <span className={styles.stableVerb}>work</span> here.</Sentence>
            <div className={styles.transition} aria-hidden="true"><FlowArrow direction="down" /></div>
            <Sentence><b>Do</b> you <span className={styles.stableVerb}>work</span> here?</Sentence>
            <div className={styles.transition} aria-hidden="true"><FlowArrow direction="down" /></div>
            <Sentence>You <b>don't</b> <span className={styles.stableVerb}>work</span> here.</Sentence>
            <p className={styles.note}>Помощник берёт на себя форму предложения.</p>
          </section>
          <section className={styles.system}>
            <h2 lang="en">am / is / are</h2>
            <p className={styles.vocabulary}>Уже могут управлять структурой.</p>
            <p className={styles.decision}>Есть <span lang="en">am / is / are</span>? → <strong>вперёд</strong></p>
            <Sentence>You <b className={styles.movingWord}>are</b> ready.</Sentence>
            <div className={styles.transition}><FlowArrow direction="down" /><span>в начало вопроса</span></div>
            <Sentence><b className={styles.movingWord}>Are</b> you ready?</Sentence>
            <div className={styles.transition} aria-hidden="true"><FlowArrow direction="down" /></div>
            <Sentence>You <b>aren't</b> ready.</Sentence>
            <p className={styles.note}>Здесь отдельный помощник не нужен.</p>
          </section>
        </div>

        <div className={styles.twoColumns}>
          <section className={styles.helper}>
            <div className={styles.helperHeading}><h2 lang="en">He / she → does</h2><p className={styles.simplification} lang="en"><span>works</span><FlowArrow /><strong>does + work</strong></p></div>
            <div className={styles.smallExamples} lang="en">
              <p>She works here.</p><p><b>Does</b> she work here?</p><p>She <b>doesn't</b> work here.</p>
            </div>
            <p className={styles.note}>После <span lang="en">does</span> → глагол в простой форме.</p>
          </section>
          <section className={styles.helper}>
            <div className={styles.helperHeading}><h2>Прошлое → <span lang="en">did</span></h2><p className={styles.simplification} lang="en"><span>worked</span><FlowArrow /><strong>did + work</strong></p></div>
            <div className={styles.smallExamples} lang="en">
              <p>You worked yesterday.</p><p><b>Did</b> you work yesterday?</p><p>You <b>didn't</b> work yesterday.</p>
            </div>
            <p className={styles.note}>После <span lang="en">did</span> → глагол тоже в простой форме.</p>
          </section>
        </div>

        <Section title="Добавляем вопросительное слово">
          <div className={styles.threeColumns}>
            <QuestionPieces pieces={['What', 'do', 'you', 'need?']} />
            <QuestionPieces pieces={['Where', 'are', 'you', 'going?']} />
            <QuestionPieces pieces={['Why', 'did', 'she', 'leave?']} />
          </div>
          <p className={styles.note}>Вопросительное слово — первым. Дальше — обычная структура вопроса.</p>
        </Section>

        <div className={styles.twoColumns}>
          <Section title="Важно: длинный вопрос" className={styles.longQuestion}>
            <p className={styles.note}>Внутри второй части порядок снова обычный.</p>
            <p className={styles.longPieces} lang="en"><span>Do you know</span> + <strong>where it is?</strong></p>
            <p className={styles.correct} lang="en"><span aria-label="Правильно">✓</span> Do you know where it is?</p>
            <p className={styles.wrong} lang="en"><span aria-label="Неправильно">×</span> Do you know where is it?</p>
            <p className={styles.note}>Вторая часть уже не отдельный вопрос.</p>
          </Section>
          <Section title="Попробуй сам" className={styles.practice}>
            <PracticeBox question="Сделай: 1. вопрос · 2. отрицание">
              <p className={styles.practiceBase} lang="en">He works from home.</p>
              <div className={styles.answers} lang="en"><p>Does he work from home?</p><p>He doesn't work from home.</p></div>
              <p className={styles.note}>Обычный глагол → значит нужен <span lang="en">does</span>.</p>
            </PracticeBox>
          </Section>
        </div>

        <Section title="Типичные ошибки">
          <div className={styles.threeColumns}>
            <MistakeBox wrong="Does she works here?" correct="Does she work here?" />
            <MistakeBox wrong="Where you are going?" correct="Where are you going?" />
            <MistakeBox wrong="Did you worked yesterday?" correct="Did you work yesterday?" />
          </div>
        </Section>

        <aside className={styles.takeaway} aria-label="Главный вывод">
          <div className={styles.twoColumns}>
            <div><strong>Обычный глагол → нужен помощник.</strong><p lang="en">work → Do you work?</p></div>
            <div><strong><span lang="en">am / is / are</span> → сами идут вперёд.</strong><p lang="en">ready → Are you ready?</p></div>
          </div>
          <p className={styles.note}>Сначала найди тип предложения — потом меняй структуру.</p>
        </aside>
      </div>
      <CourseFooter card={card} previousLabel="Как собрать предложение" nextLabel="Как английский показывает время" />
    </A4Page>
  );
}
