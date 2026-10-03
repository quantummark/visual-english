import { formatCardNumber } from '../data/courseCards';
import { courseCardPath } from '../courses/coursePaths';
import { getNextCard, getPreviousCard } from '../courses/courseRegistry';
import type { AvailableCourse, CourseLesson } from '../courses/courseTypes';

export function ViewerNavigation({ course, card, variant, openSheet }: { course: AvailableCourse; card: CourseLesson; variant: 'side' | 'mobile'; openSheet?: () => void }) {
  const previous = getPreviousCard(course, card);
  const next = getNextCard(course, card);
  return <nav className={`viewer-navigation viewer-navigation--${variant} no-print`} aria-label={variant === 'side' ? 'Боковая навигация' : 'Навигация по курсу'}>
    {previous ? <a className="viewer-navigation__previous" href={courseCardPath(course, previous.number)} aria-label="Предыдущая карточка" title={`${formatCardNumber(previous.number)} — ${previous.title}`}><span aria-hidden="true">‹</span></a> : <span />}
    {variant === 'mobile' && <button className="viewer-button" onClick={openSheet} aria-label="Все карточки">{formatCardNumber(card.number)} / {course.cards.length}<span>Все карточки</span></button>}
    {next ? <a className="viewer-navigation__next" href={courseCardPath(course, next.number)} aria-label="Следующая карточка" title={`${formatCardNumber(next.number)} — ${next.title}`}><span aria-hidden="true">›</span></a> : <span />}
  </nav>;
}
