import type { Course, CourseLesson } from '../courses/courseTypes';
import { coursePath } from '../courses/coursePaths';
import { formatCardNumber } from '../data/courseCards';
import type { FitMode } from './useViewerZoom';
import { CourseProgress } from '../progress/CourseProgress';
import { CardCompletionButton } from '../progress/CardCompletionButton';

interface Props {
  course: Course;
  card: CourseLesson;
  zoom: number;
  fitMode: FitMode;
  setZoom: (zoom: number) => void;
  step: (direction: number) => void;
  fit: (mode: FitMode) => void;
  focus: () => void;
  completed: boolean;
  completedCount: number;
  toggleCompleted: () => void;
}

export function CardViewerToolbar({ course, card, zoom, fitMode, setZoom, step, fit, focus, completed, completedCount, toggleCompleted }: Props) {
  return <header className="viewer-toolbar no-print">
    <div className="viewer-toolbar__back"><a className="viewer-button" href={coursePath(course)} aria-label="К курсу">← <span>К курсу</span></a><div className="viewer-course-progress"><a className="viewer-course-label" href={coursePath(course)}>{course.title}</a><CourseProgress completed={completedCount} total={course.cards.length} compact /></div></div>
    <div className="viewer-toolbar__title" aria-live="polite"><strong>{formatCardNumber(card.number)} / {course.cards.length}{course.status === 'coming-soon' && ' · В разработке'}</strong><span>{card.title}</span><CardCompletionButton completed={completed} onToggle={toggleCompleted} /></div>
    <div className="viewer-toolbar__actions">
      <div className="viewer-zoom">
        <select className="viewer-fit" aria-label="Подогнать карточку" value="" title={fitMode === 'page' ? 'По странице' : fitMode === 'width' ? 'По ширине' : 'Выбрать масштаб'} onChange={(event) => fit(event.target.value as FitMode)}>
          <option value="" disabled>Fit</option><option value="page">По странице</option><option value="width">По ширине</option><option value="manual">100%</option>
        </select>
        <button className="viewer-button" onClick={() => step(-1)} disabled={zoom <= .5} aria-label="Уменьшить масштаб">−</button>
        <div className="viewer-zoom__slider">
          <input type="range" min={Math.min(50, Math.round(zoom * 100))} max="200" step="1" value={Math.round(zoom * 100)} aria-label="Масштаб карточки" aria-valuetext={`${Math.round(zoom * 100)}%`} onChange={(event) => setZoom(Number(event.target.value) / 100)} />
          <output className="viewer-zoom__value">{Math.round(zoom * 100)}%</output>
        </div>
        <button className="viewer-button" onClick={() => step(1)} disabled={zoom >= 2} aria-label="Увеличить масштаб">+</button>
      </div>
      <button className="viewer-button" onClick={focus} aria-label="Режим фокуса" title="Режим фокуса">⛶ <span>Focus</span></button>
      {course.printPath && <a className="viewer-button viewer-pdf" href={course.printPath}>Печать / PDF ↗</a>}
    </div>
  </header>;
}
