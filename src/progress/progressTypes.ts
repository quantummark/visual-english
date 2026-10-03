export interface CourseProgressData {
  lastViewedCardId: number | null;
  completedCardIds: readonly number[];
  updatedAt: string | null;
}

export interface ProgressStore {
  version: 1;
  courses: Record<string, CourseProgressData>;
}
