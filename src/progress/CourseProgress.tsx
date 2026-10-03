import './progress.css';

export function CourseProgress({ completed, total, compact = false }: { completed: number; total: number; compact?: boolean }) {
  return <div className={`course-progress ${compact ? 'course-progress--compact' : ''}`}>
    <span className="course-progress__label">{completed} / {total} изучено</span>
    <div className="course-progress__track" role="progressbar" aria-label="Прогресс курса" aria-valuemin={0} aria-valuemax={total} aria-valuenow={completed} aria-valuetext={`${completed} из ${total} карточек изучено`}><span style={{ width: `${total ? completed / total * 100 : 0}%` }} /></div>
  </div>;
}
