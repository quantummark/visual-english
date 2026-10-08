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
  supportingTitle?: string;
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

interface CourseStructure extends CourseInfo {
  cards: readonly CourseLesson[];
  cardIds: readonly number[];
  stages: readonly CourseStage[];
  previewCardNumbers: readonly number[];
  overview: {
    description: string;
    introduction: string;
    principle: string;
    outcomes?: readonly string[];
  };
  printPath?: string;
}

export interface AvailableCourse extends CourseStructure {
  status: 'available';
}

export interface ComingSoonCourse extends CourseStructure {
  status: 'coming-soon';
}

export type Course = AvailableCourse | ComingSoonCourse;
