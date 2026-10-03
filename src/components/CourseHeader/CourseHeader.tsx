import type { CourseCard } from '../../types/course';
import { formatCardNumber, totalCards } from '../../data/courseCards';

export function CourseHeader({ card, secondaryLabel }: { card: CourseCard; secondaryLabel?: string }) {
  return <header className="course-header">
    <div className="course-header__top"><span>VISUAL ENGLISH B2 COURSE</span><span>{formatCardNumber(card.id)} / {totalCards}</span></div>
    <div className="course-header__category"><span className="accent-dot" />{secondaryLabel ?? card.category}</div>
    <h1 id={`card-title-${card.id}`}>{card.title}</h1>
    <p className="course-subtitle">{card.subtitle}</p>
  </header>;
}
