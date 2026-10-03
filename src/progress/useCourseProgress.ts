import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { getCourseProgress, getServerProgressStore, loadProgressStore, resetCourseProgress, setCardCompleted, setLastViewedCard, subscribeProgress, toggleCardCompleted } from './progressStorage';

export function useCourseProgress(courseId: string, cardIds: readonly number[]) {
  const store = useSyncExternalStore(subscribeProgress, loadProgressStore, getServerProgressStore);
  const progress = useMemo(() => getCourseProgress(courseId, cardIds, store), [courseId, cardIds, store]);
  const setLastViewed = useCallback((id: number) => setLastViewedCard(courseId, id, cardIds), [courseId, cardIds]);
  const toggleCompleted = useCallback((id: number) => toggleCardCompleted(courseId, id, cardIds), [courseId, cardIds]);
  const markCompleted = useCallback((id: number) => setCardCompleted(courseId, id, true, cardIds), [courseId, cardIds]);
  const markIncomplete = useCallback((id: number) => setCardCompleted(courseId, id, false, cardIds), [courseId, cardIds]);
  const resetProgress = useCallback(() => resetCourseProgress(courseId), [courseId]);
  const completedCount = progress.completedCardIds.length;
  return {
    progress, completedCardIds: progress.completedCardIds, completedCount, lastViewedCardId: progress.lastViewedCardId,
    completionPercentage: cardIds.length ? completedCount / cardIds.length * 100 : 0,
    isCompleted: (id: number) => progress.completedCardIds.includes(id),
    setLastViewed, toggleCompleted, markCompleted, markIncomplete, resetProgress,
  };
}
