import { beginnerB2Course } from './beginnerB2/course';
import { b2C1Course } from './b2C1/course';
import type { AvailableCourse, ComingSoonCourse, Course, CourseLesson } from './courseTypes';

export const courseRegistry: readonly Course[] = [beginnerB2Course, b2C1Course];

export const getCourseBySlug = (slug: string) => courseRegistry.find((course) => course.slug === slug);
export const getAvailableCourses = (): AvailableCourse[] => courseRegistry.filter((course) => course.status === 'available');
export const getComingSoonCourses = (): ComingSoonCourse[] => courseRegistry.filter((course) => course.status === 'coming-soon');
export const getCardByNumber = (course: Course, number: number) => course.cards.find((card) => card.number === number);
export const getCardById = (course: Course, id: number) => course.cards.find((card) => card.id === id);
export const getPreviousCard = (course: Course, card: CourseLesson) => card.previous === null ? undefined : getCardById(course, card.previous);
export const getNextCard = (course: Course, card: CourseLesson) => card.next === null ? undefined : getCardById(course, card.next);
