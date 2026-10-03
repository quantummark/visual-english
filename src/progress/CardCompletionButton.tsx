import './progress.css';

export function CardCompletionButton({ completed, onToggle }: { completed: boolean; onToggle: () => void }) {
  return <button className="viewer-button card-completion" data-completed={completed} aria-pressed={completed} aria-label={completed ? 'Снять отметку изучено' : 'Отметить карточку как изученную'} title={completed ? 'Снять отметку изучено' : 'Отметить карточку как изученную'} onClick={onToggle}><span aria-hidden="true">✓</span><span className="card-completion__text">{completed ? 'Изучено' : 'Отметить как изученное'}</span></button>;
}
