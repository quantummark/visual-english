import { beginnerB2Course } from './beginnerB2/course';
import type { AvailableCourse, ComingSoonCourse, Course, CourseLesson } from './courseTypes';

export const courseRegistry: readonly Course[] = [beginnerB2Course, {
  id: 'b2-c1', slug: 'b2-c1', title: 'B2 → C1', name: 'Advanced English', levelFrom: 'B2', levelTo: 'C1',
  description: 'Более точная речь, сложные идеи, natural English и продвинутое понимание языка.',
  status: 'coming-soon', accent: 'purple', cards: [], stages: [],
}];

export const getCourseBySlug = (slug: string) => courseRegistry.find((course) => course.slug === slug);
export const getAvailableCourses = (): AvailableCourse[] => courseRegistry.filter((course) => course.status === 'available');
export const getComingSoonCourses = (): ComingSoonCourse[] => courseRegistry.filter((course) => course.status === 'coming-soon');
export const getCardByNumber = (course: AvailableCourse, number: number) => course.cards.find((card) => card.number === number);
export const getCardById = (course: AvailableCourse, id: number) => course.cards.find((card) => card.id === id);
export const getPreviousCard = (course: AvailableCourse, card: CourseLesson) => card.previous === null ? undefined : getCardById(course, card.previous);
export const getNextCard = (course: AvailableCourse, card: CourseLesson) => card.next === null ? undefined : getCardById(course, card.next);
