import type { CourseProgressData, ProgressStore } from './progressTypes';

export const PROGRESS_STORAGE_KEY = 'visual-english-progress';
const EMPTY_COURSE: CourseProgressData = { lastViewedCardId: null, completedCardIds: [], updatedAt: null };
const EMPTY_STORE: ProgressStore = { version: 1, courses: {} };
let cachedRaw: string | null | undefined;
let cachedStore = EMPTY_STORE;
const listeners = new Set<() => void>();

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const isCardId = (value: unknown): value is number => typeof value === 'number' && Number.isSafeInteger(value) && value > 0;

function parseStore(raw: string | null): ProgressStore {
  if (!raw) return EMPTY_STORE;
  try {
    const data: unknown = JSON.parse(raw);
    // Future migrations can be dispatched here by schema version.
    if (!isObject(data) || data.version !== 1 || !isObject(data.courses)) return EMPTY_STORE;
    const courses: Record<string, CourseProgressData> = Object.fromEntries(Object.entries(data.courses).filter(([, value]) => isObject(value)).map(([id, value]) => {
      const record = value as Record<string, unknown>;
      return [id, {
        lastViewedCardId: isCardId(record.lastViewedCardId) ? record.lastViewedCardId : null,
        completedCardIds: Array.isArray(record.completedCardIds) ? [...new Set(record.completedCardIds.filter(isCardId))].sort((a, b) => a - b) : [],
        updatedAt: typeof record.updatedAt === 'string' && !Number.isNaN(Date.parse(record.updatedAt)) ? record.updatedAt : null,
      }];
    }));
    return { version: 1, courses };
  } catch {
    return EMPTY_STORE;
  }
}

/** Cached snapshots are stable for React, with storage reads deferred to browser use. */
export function loadProgressStore(): ProgressStore {
  if (typeof window === 'undefined') return cachedStore;
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw !== cachedRaw) { cachedRaw = raw; cachedStore = parseStore(raw); }
  } catch { /* Storage denied: keep this session's in-memory progress usable. */ }
  return cachedStore;
}

export const getServerProgressStore = () => EMPTY_STORE;

export function getCourseProgress(courseId: string, cardIds: readonly number[], store = loadProgressStore()): CourseProgressData {
  const progress = Object.hasOwn(store.courses, courseId) ? store.courses[courseId] : EMPTY_COURSE;
  return {
    ...progress,
    lastViewedCardId: progress.lastViewedCardId !== null && cardIds.includes(progress.lastViewedCardId) ? progress.lastViewedCardId : null,
    completedCardIds: progress.completedCardIds.filter((id) => cardIds.includes(id)),
  };
}

function notify() { listeners.forEach((listener) => listener()); }
function storageChanged(event: StorageEvent) {
  if (event.key === PROGRESS_STORAGE_KEY || event.key === null) notify();
}

export function subscribeProgress(listener: () => void) {
  if (listeners.size === 0 && typeof window !== 'undefined') window.addEventListener('storage', storageChanged);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== 'undefined') window.removeEventListener('storage', storageChanged);
  };
}

function saveCourse(courseId: string, progress: CourseProgressData) {
  const current = loadProgressStore();
  const next: ProgressStore = { version: 1, courses: { ...current.courses, [courseId]: progress } };
  cachedStore = next;
  try {
    if (typeof window !== 'undefined') {
      const raw = JSON.stringify(next);
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, raw);
      cachedRaw = raw;
    }
  } catch { /* Quota/private-mode failures must not interrupt the current session. */ }
  notify();
}

export function setLastViewedCard(courseId: string, cardId: number, cardIds: readonly number[]) {
  if (!cardIds.includes(cardId)) return;
  const progress = getCourseProgress(courseId, cardIds);
  if (progress.lastViewedCardId === cardId) return;
  saveCourse(courseId, { ...progress, lastViewedCardId: cardId, updatedAt: new Date().toISOString() });
}

export function setCardCompleted(courseId: string, cardId: number, completed: boolean, cardIds: readonly number[]) {
  if (!cardIds.includes(cardId)) return;
  const progress = getCourseProgress(courseId, cardIds);
  if (progress.completedCardIds.includes(cardId) === completed) return;
  const completedCardIds = completed ? [...progress.completedCardIds, cardId].sort((a, b) => a - b) : progress.completedCardIds.filter((id) => id !== cardId);
  saveCourse(courseId, { ...progress, completedCardIds, updatedAt: new Date().toISOString() });
}

export function toggleCardCompleted(courseId: string, cardId: number, cardIds: readonly number[]) {
  setCardCompleted(courseId, cardId, !getCourseProgress(courseId, cardIds).completedCardIds.includes(cardId), cardIds);
}

export function resetCourseProgress(courseId: string) {
  saveCourse(courseId, { ...EMPTY_COURSE, updatedAt: new Date().toISOString() });
}
