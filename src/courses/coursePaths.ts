import type { Course } from './courseTypes';

export const coursePath = (course: Pick<Course, 'slug'>) => `/courses/${encodeURIComponent(course.slug)}`;
export const coursePrintPath = (course: Pick<Course, 'slug'>) => `${coursePath(course)}/print`;
export const courseCardPath = (course: Pick<Course, 'slug'>, number: number) => `${coursePath(course)}/cards/${String(number).padStart(2, '0')}`;
