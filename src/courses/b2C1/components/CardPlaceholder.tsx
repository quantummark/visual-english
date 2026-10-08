import { A4Page } from '../../../components/A4Page/A4Page';
import type { CardId } from '../../../types/course';
import { b2C1Cards } from '../cards';
import './placeholder.css';

export function CardPlaceholder({ number }: { number: CardId }) {
  const card = b2C1Cards[number - 1];
  return <A4Page cardId={card.id} accent={card.accent} className="advanced-placeholder">
    <header className="course-header">
      <div className="course-header__top"><span>B2 → C1</span><span>{String(card.number).padStart(2, '0')} / {b2C1Cards.length}</span></div>
      <div className="course-header__category"><span className="accent-dot" />{card.category}</div>
      <h1 id={`card-title-${card.id}`}>{card.title}</h1>
    </header>
    <p className="advanced-placeholder__message">Материал карточки будет добавлен следующим этапом.</p>
  </A4Page>;
}
