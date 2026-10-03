import type { ReactNode } from 'react';
import {
  A4Page, CourseHeader, CourseFooter, MainIdeaBox, ExampleCard,
  StageBadge, Section, StepFlow, FlowArrow, Timeline, PracticeBox, IconBadge,
} from '../components';
import { getCourseCard } from '../data/courseCards';
import type { Accent } from '../types/course';
import styles from './Card01MasterMap.module.css';

function MapStage({ stage, title, subtitle, accent, children }: {
  stage: 1 | 2 | 3;
  title: string;
  subtitle: string;
  accent: Accent;
  children: ReactNode;
}) {
  return (
    <section className={styles.stage} data-accent={accent} aria-labelledby={`master-stage-${stage}`}>
      <header className={styles.stageHeader}>
        <StageBadge stage={stage} />
        <h2 id={`master-stage-${stage}`}>{title}</h2>
        <p>{subtitle}</p>
      </header>
      <div className={`${styles.nodes} ${stage === 1 ? styles.foundationNodes : ''}`}>{children}</div>
    </section>
  );
}

function MapNode({ title, children, note, accent }: {
  title: string;
  children: ReactNode;
  note?: string;
  accent?: Accent;
}) {
  return (
    <div className={styles.node} data-accent={accent}>
      <h3>{title}</h3>
      <div className={styles.nodeVisual}>{children}</div>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}

const learningActions = [
  { label: 'ПОНЯТЬ', path: 'M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3Z' },
  { label: 'УВИДЕТЬ', path: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
  { label: 'УСЛЫШАТЬ', path: 'M7 9a6 6 0 0 1 12 0c0 4-4 4-4 7a4 4 0 0 1-8 0m4-7a2 2 0 0 1 4 0c0 2-2 2-2 4' },
  { label: 'ПОВТОРИТЬ', path: 'M4 8h12l-3-3m3 3-3 3M20 16H8l3 3m-3-3 3-3M4 8v5m16 3v-5' },
  { label: 'СКАЗАТЬ САМОМУ', path: 'M20 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 18 0ZM7 11h10M7 15h6' },
] as const;

export function Card01MasterMap() {
  const card = getCourseCard(1)!;
  return (
    <A4Page cardId={card.id} accent={card.accent} className={styles.masterMap}>
      <CourseHeader card={card} secondaryLabel="Master Map" />
      <div className={`page-content ${styles.content}`}>
        <MainIdeaBox>
          <strong>Английский — это не сотни отдельных правил.</strong>
          <p className={styles.introduction}>Сначала мы учимся собирать мысль, затем уточняем её смысл, а после превращаем знания в живую речь.</p>
        </MainIdeaBox>

        <div className={styles.stages}>
          <MapStage stage={1} title="Собираем основу" subtitle="Учимся строить простую английскую мысль." accent="blue">
            <MapNode title="Собираем предложение">
              <div className={styles.construction} aria-label="Кто, что делает, что или кого, детали">
                <span>КТО</span><FlowArrow /><span>ЧТО ДЕЛАЕТ</span><FlowArrow /><span>ЧТО / КОГО</span><FlowArrow /><span>ДЕТАЛИ</span>
              </div>
              <ExampleCard english="I work on my project every day." explanation="Собираем мысль блоками." />
            </MapNode>
            <MapNode title="Вопрос и отрицание" note="Меняем структуру, сохраняем смысл.">
              <p className={styles.english} lang="en">Do you work here?</p>
              <p className={styles.english} lang="en">I don't work here.</p>
            </MapNode>
            <MapNode title="Показываем время" note="Когда это происходит.">
              <Timeline label="Раньше, сейчас, потом" activeId="now" points={[
                { id: 'past', label: 'раньше', note: <span lang="en">I worked.</span> },
                { id: 'now', label: 'сейчас', note: <span lang="en">I work.</span> },
                { id: 'future', label: 'потом', note: <span lang="en">I'll work.</span> },
              ]} />
            </MapNode>
          </MapStage>
          <div className={styles.stageConnector} aria-hidden="true"><FlowArrow direction="down" /></div>
          <MapStage stage={2} title="Учимся точно выражать мысль" subtitle="Добавляем намерение, связь между идеями и нужные детали." accent="green">
            <MapNode title="Могу / хочу / нужно" note="Что я хочу выразить?">
              <div className={styles.phrases} lang="en"><span>I can.</span><span>I want to.</span><span>I need to.</span></div>
            </MapNode>
            <MapNode title="Соединяем мысли" note="Связная речь из фраз.">
              <div className={styles.phrases} lang="en"><span>because</span><span>but</span><span>so</span><span>if</span></div>
            </MapNode>
            <MapNode title="Готовые фразы" note="Учим слова вместе." accent="teal">
              <div className={styles.phrases} lang="en"><span>depend on</span><span>wait for</span><span>interested in</span></div>
            </MapNode>
            <MapNode title="Что и сколько?" note="О чём? И сколько?">
              <p className={styles.english} lang="en">a / the</p>
              <p className={styles.english} lang="en">some / many / much</p>
            </MapNode>
          </MapStage>
          <div className={styles.stageConnector} aria-hidden="true"><FlowArrow direction="down" /></div>
          <MapStage stage={3} title="Говорим свободнее" subtitle="Выражаем более сложные идеи и понимаем живую речь." accent="purple">
            <MapNode title="Разные ситуации" note="Реальность / воображение.">
              <p className={styles.english} lang="en">If I have time...</p>
              <p className={styles.english} lang="en">If I had more time...</p>
            </MapNode>
            <MapNode title="Говорим точнее" note="Форма зависит от смысла.">
              <p className={styles.english} lang="en">The problem was fixed.</p>
              <p className={styles.english} lang="en">He said he needed more time.</p>
            </MapNode>
            <MapNode title="Слышим речь" note="Слова сокращаются и соединяются." accent="cyan">
              <div className={styles.phrases} lang="en"><span>I'm</span><span>I'll</span><span>I'd</span><span>gonna</span></div>
            </MapNode>
            <MapNode title="Речь как навык" note="Знание → навык." accent="cyan">
              <ol className={styles.conversationFlow} aria-label="Практика общения">
                <li>слушаем → повторяем</li>
                <li>отвечаем → продолжаем</li>
              </ol>
            </MapNode>
          </MapStage>
        </div>

        <Section title="Как знания превращаются в речь" className={styles.learningLoop}>
          <StepFlow label="Цикл освоения языка" steps={learningActions.map((action) => (
            <div className={styles.learningAction} key={action.label}>
              <IconBadge label={action.label}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={action.path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></IconBadge>
              <span>{action.label}</span>
            </div>
          ))} />
        </Section>

        <aside className={styles.takeaway} aria-label="Главный вывод">
          <strong>Тебе не нужно заучивать английский как список правил.</strong>
          <p>Нужно понять, какую мысль ты хочешь выразить и какую конструкцию для этого выбрать.</p>
          <div>Сначала смысл <FlowArrow /> потом английская форма.</div>
        </aside>

        <Section title="Попробуй сам" className={styles.practice}>
          <PracticeBox question="Что нужно научиться делать первым?">
            <ol className={styles.answers} type="A">
              <li>Произносить всё идеально</li>
              <li>Знать названия всех времён</li>
              <li className={styles.correctAnswer}><strong>Собирать простую мысль</strong><span aria-label="Правильный ответ: C">✓ C</span></li>
            </ol>
          </PracticeBox>
        </Section>
      </div>
      <CourseFooter card={card} nextLabel="Как собрать предложение" />
    </A4Page>
  );
}
