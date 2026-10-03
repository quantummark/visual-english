import type { ComponentType } from 'react';
import type { Accent, CourseCard } from '../types/course';

export interface CourseLesson extends Omit<CourseCard, 'id' | 'previous' | 'next'> {
  id: number;
  number: number;
  stageId: string;
  component: ComponentType;
  previous: number | null;
  next: number | null;
}

export interface CourseStage {
  id: string;
  title: string;
  description: string;
  accent: Accent;
  cardNumbers: readonly number[];
}

interface CourseInfo {
  id: string;
  slug: string;
  title: string;
  name: string;
  levelFrom: string;
  levelTo: string;
  description: string;
  accent: Accent;
}

export interface AvailableCourse extends CourseInfo {
  status: 'available';
  cards: readonly CourseLesson[];
  cardIds: readonly number[];
  stages: readonly CourseStage[];
  previewCardNumbers: readonly number[];
}

export interface ComingSoonCourse extends CourseInfo {
  status: 'coming-soon';
  cards: readonly [];
  stages: readonly [];
}

export type Course = AvailableCourse | ComingSoonCourse;
