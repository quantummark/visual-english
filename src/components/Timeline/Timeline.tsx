import type { ReactNode } from 'react';

export interface TimelinePoint { id: string; label: string; note?: ReactNode }

export function Timeline({ points, label = 'Линия времени', activeId }: { points: readonly TimelinePoint[]; label?: string; activeId?: string }) {
  return <div className="timeline" role="group" aria-label={label}>
    <svg className="timeline__line" viewBox="0 0 600 24" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M1 12h594l-8-7m8 7-8 7" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg>
    <ol className="timeline__points">{points.map((point) => <li key={point.id} className={point.id === activeId ? 'timeline__point--active' : ''}><span className="timeline__dot" /><strong>{point.label}</strong>{point.note && <span className="small-note">{point.note}</span>}</li>)}</ol>
  </div>;
}
