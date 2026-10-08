import { beginnerB2Course } from '../courses/beginnerB2/course';
import { getCardByNumber, getCourseBySlug } from '../courses/courseRegistry';

export function resolveLegacyCardRoute(pathname: string) {
  const match = /^\/cards\/(\d+)\/?$/.exec(pathname);
  const card = match && getCardByNumber(beginnerB2Course, Number(match[1]));
  return card ? { course: beginnerB2Course, card } : undefined;
}

export function resolveCardRoute(pathname: string) {
  const legacy = resolveLegacyCardRoute(pathname);
  if (legacy) return legacy;
  const match = /^\/courses\/([^/]+)\/cards\/(\d+)\/?$/.exec(pathname);
  const course = match && getCourseBySlug(match[1]);
  if (!match || !course) return undefined;
  const card = getCardByNumber(course, Number(match[2]));
  return card ? { course, card } : undefined;
}

export function resolveCourseRoute(pathname: string) {
  const match = /^\/courses\/([^/]+)\/?$/.exec(pathname);
  return match ? getCourseBySlug(match[1]) : undefined;
}

export function resolveCoursePrintRoute(pathname: string) {
  // Preserve the original public print URL as an alias of the same renderer.
  if (/^\/print\/?$/.test(pathname)) return beginnerB2Course;
  const match = /^\/courses\/([^/]+)\/print\/?$/.exec(pathname);
  const course = match ? getCourseBySlug(match[1]) : undefined;
  return course?.status === 'available' ? course : undefined;
}
