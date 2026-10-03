import { cardPath, formatCardNumber, totalCards } from '../../data/courseCards';
import type { CourseCard } from '../../types/course';

export function CourseFooter({ card, nextLabel = 'следующая карточка', previousLabel = 'предыдущая карточка', completionLabel = '✓ COURSE COMPLETE' }: { card: CourseCard; nextLabel?: string; previousLabel?: string; completionLabel?: string }) {
  return <footer className="course-footer">
    {card.previous === null ? <span className="course-footer__boundary">START</span> : <a href={cardPath(card.previous)}>← {previousLabel}</a>}
    <span className="course-footer__number">{formatCardNumber(card.id)} / {totalCards}</span>
    {card.next === null ? <span className="course-footer__boundary">{completionLabel}</span> : <a href={cardPath(card.next)}>{nextLabel} →</a>}
  </footer>;
}
