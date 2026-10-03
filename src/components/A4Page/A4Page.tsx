import type { ReactNode } from 'react';
import type { Accent, CardId } from '../../types/course';

interface A4PageProps {
  children: ReactNode;
  accent: Accent;
  cardId: CardId;
  className?: string;
}

export function A4Page({ children, accent, cardId, className = '' }: A4PageProps) {
  return <article className={`a4-page ${className}`} data-a4-page data-card-id={cardId} data-accent={accent} aria-labelledby={`card-title-${cardId}`}>{children}</article>;
}
