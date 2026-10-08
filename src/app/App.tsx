import { courseCardPath, coursePath } from '../courses/coursePaths';
import { useEffect, useSyncExternalStore } from 'react';
import { getLocationSnapshot, getServerLocationSnapshot, navigate, subscribeNavigation } from './navigation';
import { CardViewer } from '../viewer/CardViewer';
import { resolveCardRoute, resolveCourseRoute, resolveCoursePrintRoute, resolveLegacyCardRoute } from './routes';
import { PlatformHome } from '../platform/PlatformHome';
import { CourseOverview } from '../platform/CourseOverview';
import { ComingSoon } from '../platform/ComingSoon';
import { getCourseBySlug } from '../courses/courseRegistry';
import { resolveToolkitRoute } from '../toolkit/toolkitRoutes';
import { ToolkitPage } from '../toolkit/ToolkitPage';
import { CoursePrint } from '../platform/CoursePrint';

// Viewer transitions share local state; direct links and exports remain regular routes.
export function App() {
  const location = new URL(useSyncExternalStore(subscribeNavigation, getLocationSnapshot, getServerLocationSnapshot));
  const { pathname, search, hash } = location;
  const lesson = resolveCardRoute(pathname);
  const course = resolveCourseRoute(pathname);
  const printCourse = resolveCoursePrintRoute(pathname);
  const toolkit = resolveToolkitRoute(pathname);
  const legacy = resolveLegacyCardRoute(pathname);
  const legacyTarget = legacy ? courseCardPath(legacy.course, legacy.card.number) : null;
  useEffect(() => {
    if (!legacyTarget) return;
    navigate(`${legacyTarget}${search}${hash}`, true);
  }, [legacyTarget, search, hash]);
  const pageTitle = printCourse ? `Visual English Lab — ${printCourse.levelFrom} to ${printCourse.levelTo}` : toolkit ? `${toolkit.title} · Visual English Lab` : lesson ? `${lesson.card.title} · Visual English Lab` : course ? `${course.title} · Visual English Lab` : 'Visual English Lab';
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  const isExport = new URLSearchParams(search).get('export') === '1';

  if (pathname === '/') return <PlatformHome />;
  if (toolkit) return <ToolkitPage route={toolkit} location={location} />;
  if (printCourse) return <CoursePrint course={printCourse} />;

  if (lesson) {
    const { card, course: currentCourse } = lesson;
    const Card = card.component;
    if (isExport) return <main className="export-root"><Card /></main>;
    return <CardViewer key={currentCourse.id} course={currentCourse} card={card} navigate={navigate}><Card /></CardViewer>;
  }
  if (course) return course.status === 'available' || course.cards.length > 0 ? <CourseOverview course={course} /> : <ComingSoon course={course} />;
  const isCard = pathname.includes('/cards/') || pathname.startsWith('/cards/');
  const parent = getCourseBySlug(pathname.split('/')[2] ?? '');
  return <main className="not-found"><h1>{isCard ? 'Карточка не найдена' : 'Курс не найден'}</h1><p>Выберите курс и карточку, чтобы продолжить обучение.</p><a className="button" href={parent ? coursePath(parent) : '/'}>{parent ? 'К курсу →' : 'Все курсы →'}</a></main>;
}
