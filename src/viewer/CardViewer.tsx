import { useEffect, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import type { AvailableCourse, CourseLesson } from '../courses/courseTypes';
import { courseCardPath } from '../courses/coursePaths';
import { getNextCard, getPreviousCard } from '../courses/courseRegistry';
import { useCourseProgress } from '../progress/useCourseProgress';
import { resolveCardRoute } from '../app/routes';
import { CardViewerToolbar } from './CardViewerToolbar';
import { ViewerNavigation } from './ViewerNavigation';
import { CourseFilmstrip } from './CourseFilmstrip';
import { MobileCardSheet } from './MobileCardSheet';
import { PAGE_HEIGHT, PAGE_WIDTH, useViewerZoom } from './useViewerZoom';
import './viewer.css';

export function CardViewer({ course, card, navigate, children }: { course: AvailableCourse; card: CourseLesson; navigate: (path: string) => void; children: ReactNode }) {
  const { viewport, zoom, fitMode, setZoom, step, fit, preserveZoom } = useViewerZoom();
  const progress = useCourseProgress(course.id, course.cardIds);
  const { setLastViewed } = progress;
  const [focusMode, setFocusMode] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const toggleFocus = () => { preserveZoom(); setFocusMode((value) => !value); };
  useEffect(() => { viewport.current?.scrollTo({ top: 0, left: 0 }); }, [card.id, viewport]);
  useEffect(() => { setLastViewed(card.id); }, [card.id, setLastViewed]);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && focusMode) { event.preventDefault(); setFocusMode(false); return; }
      if (event.ctrlKey || event.metaKey || event.altKey || sheetOpen) return;
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, button, a, [contenteditable="true"], [role="slider"], [role="textbox"]')) return;
      const destination = event.key === 'ArrowLeft' ? getPreviousCard(course, card) : event.key === 'ArrowRight' ? getNextCard(course, card) : undefined;
      if (destination) { event.preventDefault(); navigate(courseCardPath(course, destination.number)); }
      else if (event.key === '+' || event.key === '=') { event.preventDefault(); step(1); }
      else if (event.key === '-') { event.preventDefault(); step(-1); }
      else if (event.key === '0') { event.preventDefault(); fit('manual'); }
      else if (event.key.toLowerCase() === 'f') { event.preventDefault(); fit('page'); }
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [course, card, navigate, step, fit, focusMode, sheetOpen]);
  const followLink = (event: MouseEvent<HTMLElement>) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!link || link.target || link.download || link.origin !== location.origin || link.search) return;
    const destination = resolveCardRoute(link.pathname);
    if (!destination) return;
    event.preventDefault();
    setSheetOpen(false);
    navigate(courseCardPath(destination.course, destination.card.number));
    // Avoid a now-hidden drawer link retaining keyboard focus.
    if (sheetOpen) viewport.current?.focus();
  };
  return <main className={`card-viewer ${focusMode ? 'card-viewer--focus' : ''}`} data-fit-mode={fitMode} onClick={followLink}>
    {!focusMode && <CardViewerToolbar course={course} card={card} zoom={zoom} fitMode={fitMode} setZoom={setZoom} step={step} fit={fit} focus={toggleFocus} completed={progress.isCompleted(card.id)} completedCount={progress.completedCount} toggleCompleted={() => progress.toggleCompleted(card.id)} />}
    {focusMode && <button className="viewer-focus-exit viewer-button no-print" onClick={toggleFocus} aria-label="Выйти из режима фокуса">⛶ Выйти <span>· Esc</span></button>}
    <div className="viewer-workspace">
      <div className="viewer-viewport" ref={viewport} tabIndex={-1} aria-label={`Карточка ${card.id}: ${card.title}`}>
        <div className="viewer-canvas"><div className="viewer-card-frame" style={{ width: PAGE_WIDTH * zoom, height: PAGE_HEIGHT * zoom }}><div className="viewer-card-page" style={{ transform: `scale(${zoom})` }}>{children}</div></div></div>
      </div>
      <ViewerNavigation course={course} card={card} variant="side" />
    </div>
    {!focusMode && <div className="viewer-desktop-filmstrip"><CourseFilmstrip course={course} card={card} collapsed={collapsed} toggle={() => setCollapsed((value) => !value)} completedCardIds={progress.completedCardIds} /></div>}
    <div className="viewer-mobile-nav"><ViewerNavigation course={course} card={card} variant="mobile" openSheet={() => setSheetOpen(true)} /></div>
    {sheetOpen && <MobileCardSheet course={course} card={card} close={() => setSheetOpen(false)} completedCardIds={progress.completedCardIds} />}
  </main>;
}
