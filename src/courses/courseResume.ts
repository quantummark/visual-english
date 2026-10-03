import type { CourseProgressData } from '../progress/progressTypes';
import { getCardById } from './courseRegistry';
import { courseCardPath } from './coursePaths';
import type { AvailableCourse } from './courseTypes';

export function getCourseResume(course: AvailableCourse, progress: CourseProgressData) {
  const complete = course.cards.length > 0 && course.cards.every((card) => progress.completedCardIds.includes(card.id));
  const hasProgress = progress.lastViewedCardId !== null || progress.completedCardIds.length > 0;
  const last = progress.lastViewedCardId === null ? undefined : getCardById(course, progress.lastViewedCardId);
  const card = complete ? course.cards[0] : last ?? course.cards.find((item) => !progress.completedCardIds.includes(item.id)) ?? course.cards[0];
  return {
    complete, hasProgress, card, href: courseCardPath(course, card.number),
    label: complete ? 'Повторить курс' : hasProgress ? 'Продолжить' : 'Начать курс',
    detailedLabel: complete ? 'Повторить курс' : hasProgress ? `Продолжить с карточки ${String(card.number).padStart(2, '0')}` : 'Начать курс',
  };
}
