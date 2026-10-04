import { useState } from 'react';
import type { AvailableCourse, CourseLesson } from '../courses/courseTypes';
import { courseCardPath } from '../courses/coursePaths';
import { getCourseResume } from '../courses/courseResume';
import { useCourseProgress } from '../progress/useCourseProgress';
import { CourseProgress } from '../progress/CourseProgress';
import { ResetProgressDialog } from '../progress/ResetProgressDialog';
import { CardThumbnail } from './CardThumbnail';
import { PlatformLayout } from './PlatformLayout';

function LessonTile({ course, card, completed, lastViewed }: { course: AvailableCourse; card: CourseLesson; completed: boolean; lastViewed: boolean }) {
  return <article className="lesson-tile gallery-card" data-accent={card.accent} data-last-viewed={lastViewed}>
    <div className="lesson-tile__preview"><CardThumbnail card={card} /></div>
    <div className="lesson-tile__body"><span className="lesson-tile__number">{String(card.number).padStart(2, '0')}</span><h3><a className="gallery-card__link" href={courseCardPath(course, card.number)} aria-label={`Карточка ${String(card.number).padStart(2, '0')}: ${card.title}${completed ? ', изучено' : ''}`}>{card.title}</a></h3><div className="lesson-tile__status">{completed && <span className="lesson-studied">✓ Изучено</span>}{lastViewed && <span>Последняя открытая</span>}</div></div>
  </article>;
}

export function CourseOverview({ course }: { course: AvailableCourse }) {
  const progress = useCourseProgress(course.id, course.cardIds);
  const resume = getCourseResume(course, progress.progress);
  const [resetOpen, setResetOpen] = useState(false);
  return <PlatformLayout>
    <nav className="platform-breadcrumb" aria-label="Путь к курсу"><a href="/">Visual English Lab</a><span aria-hidden="true">/</span><span aria-current="page">{course.title}</span></nav>
    <header className="course-overview__header"><span className="platform-eyebrow">{course.name}</span><h1>{course.title}</h1><p>От базовой структуры предложения до уверенной разговорной речи.</p><div className="catalog-course__meta">{course.cards.length} карточек <span>·</span> {course.stages.length} этапа</div>
      <div className="course-overview__progress gallery-progress"><CourseProgress completed={progress.completedCount} total={course.cards.length} /><div className="course-overview__actions"><a className="button button--primary" href={resume.href}>{resume.detailedLabel} →</a><a className="button" href="/print">Печать / PDF ↗</a></div>{resume.hasProgress && <button className="progress-reset-link" onClick={() => setResetOpen(true)}>Сбросить прогресс</button>}</div>
    </header>
    <div className="course-overview__intro"><p>Этот курс объясняет английский через смысл и визуальные модели, а не через зубрёжку терминов. Ты научишься собирать предложения, показывать время и намерение, соединять идеи, использовать B2-конструкции, понимать живую речь и тренировать разговорный английский.</p><p className="course-principle">Сначала смысл → потом английская форма.</p></div>
    <div className="course-stages">{course.stages.map((stage, index) => {
      const cards = course.cards.filter((card) => card.stageId === stage.id);
      const completed = cards.filter((card) => progress.isCompleted(card.id)).length;
      return <section className="course-stage" data-accent={stage.accent} data-stage={stage.id} key={stage.id} aria-labelledby={`stage-${stage.id}`}><header className="course-stage__header"><div><span className="platform-eyebrow">ЭТАП {index + 1}</span><h2 id={`stage-${stage.id}`}>{stage.title}</h2><p>{stage.description}</p></div><CourseProgress completed={completed} total={cards.length} compact /></header><div className="lesson-grid">{cards.map((card) => <LessonTile key={card.id} course={course} card={card} completed={progress.isCompleted(card.id)} lastViewed={progress.lastViewedCardId === card.id} />)}</div></section>;
    })}</div>
    {resetOpen && <ResetProgressDialog close={() => setResetOpen(false)} reset={progress.resetProgress} />}
  </PlatformLayout>;
}
