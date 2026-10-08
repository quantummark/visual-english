import { memo, useEffect, useRef, useState } from 'react';
import { PagePreview } from '../components/A4Page/PagePreview';
import { formatCardNumber } from '../data/courseCards';
import { courseCardPath } from '../courses/coursePaths';
import type { Course, CourseLesson } from '../courses/courseTypes';

const FilmstripThumbnail = memo(function FilmstripThumbnail({ course, card, active, completed }: { course: Course; card: CourseLesson; active: boolean; completed: boolean }) {
  const Card = card.component;
  return <div className="viewer-thumbnail" data-accent={card.accent} data-active={active}>
    <div className="viewer-thumbnail__page" aria-hidden="true" inert><PagePreview><Card /></PagePreview></div>
    {completed && <span className="viewer-thumbnail__completed" aria-hidden="true">✓</span>}
    <a className="viewer-thumbnail__caption" href={courseCardPath(course, card.number)} aria-current={active ? 'page' : undefined} aria-label={`Карточка ${formatCardNumber(card.number)}: ${card.title}${completed ? ', изучено' : ''}`} title={card.title}><strong>{formatCardNumber(card.number)}</strong><span>{card.shortTitle}</span></a>
  </div>;
});

export function CourseFilmstrip({ course, card, collapsed, toggle, completedCardIds, sheet = false }: { course: Course; card: CourseLesson; collapsed: boolean; toggle: () => void; completedCardIds: readonly number[]; sheet?: boolean }) {
  const strip = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const host = strip.current;
    if (!host || collapsed) return;
    const active = host.querySelector<HTMLElement>('[data-active="true"]');
    if (active) {
      if (sheet) host.scrollTo({ top: active.offsetTop - host.offsetTop - 12, behavior: 'smooth' });
      else host.scrollTo({ left: active.offsetLeft - host.offsetLeft - (host.clientWidth - active.offsetWidth) / 2, behavior: 'smooth' });
    }
    const update = () => setEdges({ start: host.scrollLeft <= 1, end: host.scrollLeft + host.clientWidth >= host.scrollWidth - 1 });
    const observer = new ResizeObserver(update);
    observer.observe(host);
    host.addEventListener('scroll', update);
    update();
    return () => { observer.disconnect(); host.removeEventListener('scroll', update); };
  }, [card.id, collapsed, sheet]);
  return <section className={`viewer-filmstrip no-print ${sheet ? 'viewer-filmstrip--sheet' : ''}`} data-collapsed={collapsed} aria-label="Карточки курса">
    {!sheet && <button className="viewer-filmstrip__handle viewer-button" onClick={toggle} aria-expanded={!collapsed} aria-controls="course-filmstrip" aria-label={collapsed ? 'Показать карточки' : 'Скрыть карточки'} title={collapsed ? 'Показать карточки' : 'Скрыть карточки'}><span aria-hidden="true">{collapsed ? '⌃' : '⌄'}</span></button>}
    <div className="viewer-filmstrip__drawer" aria-hidden={collapsed || undefined} inert={collapsed}>
    <div className="viewer-filmstrip__row">
      {!sheet && <button className="viewer-button" disabled={edges.start} aria-label="Прокрутить карточки влево" onClick={() => strip.current?.scrollBy({ left: -strip.current.clientWidth * .7, behavior: 'smooth' })}>‹</button>}
      <div className="viewer-filmstrip__scroll" id={sheet ? 'mobile-filmstrip' : 'course-filmstrip'} ref={strip}>{course.cards.map((item) => <FilmstripThumbnail key={item.id} course={course} card={item} active={item.id === card.id} completed={completedCardIds.includes(item.id)} />)}</div>
      {!sheet && <button className="viewer-button" disabled={edges.end} aria-label="Прокрутить карточки вправо" onClick={() => strip.current?.scrollBy({ left: strip.current.clientWidth * .7, behavior: 'smooth' })}>›</button>}
    </div></div>
  </section>;
}
