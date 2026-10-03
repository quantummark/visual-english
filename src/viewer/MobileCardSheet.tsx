import { useEffect, useRef } from 'react';
import type { AvailableCourse, CourseLesson } from '../courses/courseTypes';
import { CourseFilmstrip } from './CourseFilmstrip';
import { CourseProgress } from '../progress/CourseProgress';

export function MobileCardSheet({ course, card, close, completedCardIds }: { course: AvailableCourse; card: CourseLesson; close: () => void; completedCardIds: readonly number[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { dialog.current?.showModal(); }, []);
  return <dialog className="viewer-sheet no-print" ref={dialog} aria-labelledby="viewer-sheet-title" onCancel={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
    <div className="viewer-sheet__content"><header><h2 id="viewer-sheet-title">Все карточки</h2><button className="viewer-button" onClick={close} aria-label="Закрыть список карточек">Закрыть ×</button></header><CourseProgress completed={completedCardIds.length} total={course.cards.length} compact /><CourseFilmstrip course={course} card={card} collapsed={false} toggle={close} completedCardIds={completedCardIds} sheet /></div>
  </dialog>;
}
