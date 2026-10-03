import assert from 'node:assert/strict';
import { getCourseProgress, loadProgressStore, PROGRESS_STORAGE_KEY, resetCourseProgress, setCardCompleted, setLastViewedCard, subscribeProgress, toggleCardCompleted } from '../src/progress/progressStorage';

// No test framework: exercise the storage contract with a small browser substitute.
const values = new Map<string, string>();
let denied = false;
const events = new EventTarget();
Object.defineProperty(globalThis, 'window', { configurable: true, value: {
  localStorage: {
    getItem: (key: string) => { if (denied) throw new Error('Storage blocked'); return values.get(key) ?? null; },
    setItem: (key: string, value: string) => { if (denied) throw new Error('Storage blocked'); values.set(key, value); },
  },
  addEventListener: events.addEventListener.bind(events), removeEventListener: events.removeEventListener.bind(events),
} });
const ids = [1, 2, 3];
const course = 'test-course';
const read = () => getCourseProgress(course, ids);
assert.deepEqual(read().completedCardIds, []);
assert.equal(read().lastViewedCardId, null);
assert.equal(values.size, 0, 'Reading must not create fake progress');
for (const raw of ['bad JSON', '[]', 'null', '{"version":2,"courses":{}}', '{"version":1,"courses":[]}']) {
  values.set(PROGRESS_STORAGE_KEY, raw);
  assert.deepEqual(read().completedCardIds, []);
}
values.set(PROGRESS_STORAGE_KEY, JSON.stringify({ version: 1, courses: { [course]: { completedCardIds: [3, 1, 1, 99, '2', 2.5, null], lastViewedCardId: 99, updatedAt: 'bad date' } } }));
assert.deepEqual(read().completedCardIds, [1, 3]);
assert.equal(read().lastViewedCardId, null);
assert.equal(read().updatedAt, null);
let notifications = 0;
const unsubscribe = subscribeProgress(() => { notifications++; });
setLastViewedCard(course, 2, ids);
assert.equal(read().lastViewedCardId, 2);
assert.deepEqual(read().completedCardIds, [1, 3], 'Viewed must not mean completed');
assert.ok(read().updatedAt);
toggleCardCompleted(course, 2, ids); assert.deepEqual(read().completedCardIds, [1, 2, 3]);
toggleCardCompleted(course, 2, ids); assert.deepEqual(read().completedCardIds, [1, 3]);
const previousNotifications = notifications;
setCardCompleted(course, 99, true, ids); setLastViewedCard(course, 99, ids);
assert.equal(notifications, previousNotifications);
setCardCompleted('another-course', 101, true, [101, 102]);
resetCourseProgress(course);
assert.deepEqual(read().completedCardIds, []); assert.equal(read().lastViewedCardId, null);
assert.deepEqual(getCourseProgress('another-course', [101, 102]).completedCardIds, [101]);
assert.equal(loadProgressStore().version, 1);
denied = true;
setCardCompleted(course, 1, true, ids);
assert.deepEqual(read().completedCardIds, [1], 'Blocked storage must retain session state');
unsubscribe();
console.log('OK progress storage: schema, malformed data, normalization, explicit completion, per-course reset, notifications, blocked storage');
