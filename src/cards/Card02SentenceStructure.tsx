import { Fragment } from 'react';
import {
  A4Page, CourseHeader, CourseFooter, MainIdeaBox, Section, ExampleCard,
  ComparisonBlock, MistakeBox, PracticeBox, FlowArrow,
} from '../components';
import { getCourseCard } from '../data/courseCards';
import styles from './Card02SentenceStructure.module.css';

function SentencePieces({ pieces, label, main = false }: {
  pieces: readonly string[];
  label: string;
  main?: boolean;
}) {
  return (
    <ol className={`${styles.pieces} ${main ? styles.constructor : ''}`} aria-label={label}>
      {pieces.map((piece, index) => (
        <Fragment key={`${index}-${piece}`}>
          <li className={styles.piece}>{piece}</li>
          {index < pieces.length - 1 && <li className={styles.connector} aria-hidden="true"><FlowArrow /></li>}
        </Fragment>
      ))}
    </ol>
  );
}

function BuildExample({ pieces, english, explanation, note }: {
  pieces: readonly string[];
  english: string;
  explanation: string;
  note: string;
}) {
  return (
    <div className={styles.buildExample}>
      <div lang="en"><SentencePieces pieces={pieces} label="Собираем предложение из частей" /></div>
      <ExampleCard english={english} explanation={explanation} />
      <p className={styles.note}>{note}</p>
    </div>
  );
}

export function Card02SentenceStructure() {
  const card = getCourseCard(2)!;
  return (
    <A4Page cardId={card.id} accent={card.accent} className={styles.sentencePage}>
      <CourseHeader card={card} secondaryLabel="Основано на Block 01 — Sentence Structure" />
      <div className={`page-content ${styles.content}`}>
        <MainIdeaBox>
          <strong>Не переводи предложение целиком.</strong>
          <p>Собирай его из понятных блоков.</p>
        </MainIdeaBox>

        <div className={styles.mainConstructor}>
          <SentencePieces main pieces={['КТО', 'ЧТО ДЕЛАЕТ', 'ЧТО / КОГО', 'ДЕТАЛИ']} label="Каркас предложения: кто, что делает, что или кого, детали" />
        </div>

        <div className={styles.twoColumns} aria-label="Один каркас — два примера">
          <BuildExample pieces={['I', 'work', 'on my project', 'every day']} english="I work on my project every day." explanation="Я работаю над своим проектом каждый день." note="Кто → действие → с чем → когда" />
          <BuildExample pieces={['She', 'likes', 'this idea', 'a lot']} english="She likes this idea a lot." explanation="Ей очень нравится эта идея." note="Та же структура — меняются только блоки." />
        </div>

        <Section title="Действие или состояние?" className={styles.meaningChoice}>
          <ComparisonBlock leftLabel="Есть действие" rightLabel="Описываем состояние"
            left={<>
              <div className={styles.examplesRow} lang="en"><span>I work.</span><span>She works.</span><span>We live here.</span></div>
              <p>Используем обычный глагол.</p>
              <p className={styles.note}><span lang="en">work</span> = что-то делаю</p>
            </>}
            right={<>
              <div className={styles.examplesRow} lang="en"><span>I am ready.</span><span>She is busy.</span><span>They are tired.</span></div>
              <p>Используем <strong lang="en">am / is / are</strong>.</p>
              <p className={styles.note}><span lang="en">ready</span> = какое у меня состояние</p>
            </>}
          />
        </Section>

        <div className={styles.twoColumns}>
          <Section title="Где ставить детали?" className={styles.wordPosition}>
            <p className={styles.positionRule}>КТО → ДЕЙСТВИЕ → ОБЪЕКТ → МЕСТО → ВРЕМЯ</p>
            <ExampleCard english="I met him at work yesterday." explanation="Я встретил его на работе вчера." />
          </Section>
          <Section title="Обычно или сейчас?" className={styles.timePreview}>
            <ComparisonBlock leftLabel="Обычно" rightLabel="Сейчас / сегодня"
              left={<ExampleCard english="I usually work at home." explanation="Я обычно работаю дома." />}
              right={<ExampleCard english="I'm working at home today." explanation="Сегодня я работаю дома." />}
            />
            <p className={styles.note}>Форма немного меняется, когда меняется смысл.</p>
          </Section>
        </div>

        <div className={styles.twoColumns}>
          <Section title="Типичная ошибка" className={styles.mistake}>
            <MistakeBox wrong="I very like it." correct="I really like it." explanation="С обычным глаголом: really like, не very like." />
          </Section>
          <Section title="Попробуй сам" className={styles.practice}>
            <PracticeBox question="Собери предложение из блоков:">
              <div lang="en" className={styles.practicePieces}>
                <span>tomorrow</span><span>I'll call</span><span>you</span>
              </div>
              <ExampleCard english="I'll call you tomorrow." explanation="Я позвоню тебе завтра." />
            </PracticeBox>
          </Section>
        </div>

        <aside className={styles.takeaway} aria-label="Главный вывод">
          <p><strong>Не переводи всё предложение.</strong> Собирай его по частям:</p>
          <div>КТО → ДЕЙСТВИЕ → ОБЪЕКТ → ДЕТАЛИ</div>
          <p className={styles.note}>Один и тот же каркас можно использовать снова и снова.</p>
        </aside>
      </div>
      <CourseFooter card={card} previousLabel="Английский как система" nextLabel="Вопросы и отрицания" />
    </A4Page>
  );
}
