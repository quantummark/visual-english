import { getAvailableCourses, getCardByNumber, getComingSoonCourses } from '../courses/courseRegistry';
import { coursePath } from '../courses/coursePaths';
import type { AvailableCourse, ComingSoonCourse } from '../courses/courseTypes';
import { getCourseResume } from '../courses/courseResume';
import { useCourseProgress } from '../progress/useCourseProgress';
import { CourseProgress } from '../progress/CourseProgress';
import { CardThumbnail } from './CardThumbnail';
import { PlatformLayout } from './PlatformLayout';
import { HomeToolkitSection } from '../toolkit/ToolkitComponents';

function AvailableCourseCard({ course }: { course: AvailableCourse }) {
  const progress = useCourseProgress(course.id, course.cardIds);
  const resume = getCourseResume(course, progress.progress);
  return <article className="catalog-course" data-accent={course.accent}>
    <div className="catalog-preview" aria-hidden="true">{course.previewCardNumbers.map((number) => {
      const card = getCardByNumber(course, number);
      return card && <div className="catalog-preview__page" key={number}><CardThumbnail card={card} /></div>;
    })}</div>
    <div className="catalog-course__body"><span className="platform-eyebrow">{course.name}</span><h3>{course.title}</h3><p>{course.description}</p><div className="catalog-course__meta">{course.cards.length} карточек <span>·</span> {course.stages.length} этапа</div><CourseProgress completed={progress.completedCount} total={course.cards.length} /><a className="button button--primary catalog-course__link" href={coursePath(course)}>{resume.label} →</a></div>
  </article>;
}

function ComingSoonCard({ course }: { course: ComingSoonCourse }) {
  return <article className="catalog-course catalog-course--soon" data-accent={course.accent}><div className="catalog-soon-visual" aria-hidden="true"><span>Следующий уровень</span><strong>{course.levelFrom} → {course.levelTo}</strong></div><div className="catalog-course__body"><span className="platform-eyebrow">{course.name} <span className="course-soon">Скоро</span></span><h3>{course.title}</h3><p>{course.description}</p>{course.cards.length > 0 && <div className="catalog-course__meta">{course.cards.length} карточек <span>·</span> {course.stages.length} этапа</div>}<a className="catalog-course__link catalog-soon-link" href={coursePath(course)}>О курсе →</a></div></article>;
}

export function PlatformHome() {
  const available = getAvailableCourses();
  const primary = available[0];
  const progress = useCourseProgress(primary.id, primary.cardIds);
  const resume = getCourseResume(primary, progress.progress);
  return <PlatformLayout>
    <section className="platform-hero"><span className="platform-eyebrow">Смысл · схемы · практика</span><h1>Увидь, как работает английский</h1><p className="platform-hero__subtitle">Пойми систему английского через визуальные схемы и реальные примеры.</p><p className="platform-hero__support">От простого предложения до уверенной разговорной речи.</p><a className="button button--primary" href={coursePath(primary)}>{resume.complete ? 'Повторить курс' : resume.hasProgress ? 'Продолжить обучение' : 'Начать обучение'} →</a></section>
    <section id="courses" className="platform-catalog" aria-labelledby="catalog-title"><div className="platform-section-heading"><h2 id="catalog-title">Курсы</h2><p>Выбери свой следующий шаг.</p></div><div className="catalog-grid">{available.map((course) => <AvailableCourseCard key={course.id} course={course} />)}{getComingSoonCourses().map((course) => <ComingSoonCard key={course.id} course={course} />)}</div></section>
    <HomeToolkitSection />
  </PlatformLayout>;
}
