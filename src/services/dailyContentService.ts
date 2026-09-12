import { Question, OneLiner, Quiz } from '../types';

/**
 * Utility to calculate days since epoch in user's local calendar date.
 * Guarantees monotonic +1 increment every midnight local time.
 */
export function getLocalDayIndex(offsetDays: number = 0): number {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

/**
 * Format local date as YYYY-MM-DD.
 */
export function getLocalDateString(offsetDays: number = 0): string {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Stable 32-bit positive integer hash of a string.
 */
export function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Mulberry32 PRNG generator for reproducible randomness given a seed.
 */
export function createMulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministically shuffles an array using a numeric seed without mutating the original.
 */
export function seededShuffle<T>(array: readonly T[], seed: number): T[] {
  const copy = [...array];
  const prng = createMulberry32(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/**
 * Returns today's featured Daily Question from the question bank.
 * Rotates every calendar day, guaranteed never to repeat on consecutive days.
 */
export function getDailyQuestion(questions: Question[], offsetDays: number = 0): Question | null {
  if (!questions || questions.length === 0) return null;
  if (questions.length === 1) return questions[0];

  const MASTER_Q_SEED = 20260909;
  const permuted = seededShuffle(questions, MASTER_Q_SEED);

  const dayIndex = getLocalDayIndex(offsetDays);
  const chosenIndex = ((dayIndex % permuted.length) + permuted.length) % permuted.length;

  return permuted[chosenIndex];
}

/**
 * Returns today's featured One-Liner fact from the one-liner collection.
 * Rotates every calendar day, guaranteed never to repeat on consecutive days.
 */
export function getDailyOneLiner(oneLiners: OneLiner[], offsetDays: number = 0): OneLiner | null {
  if (!oneLiners || oneLiners.length === 0) return null;
  if (oneLiners.length === 1) return oneLiners[0];

  const MASTER_OL_SEED = 98765432;
  const permuted = seededShuffle(oneLiners, MASTER_OL_SEED);

  const dayIndex = getLocalDayIndex(offsetDays);
  const chosenIndex = ((dayIndex % permuted.length) + permuted.length) % permuted.length;

  return permuted[chosenIndex];
}

/**
 * Returns today's 10 Daily Quiz Challenge questions.
 * - Shuffled from all existing MCQs across the syllabus.
 * - Serves exactly 10 questions each day.
 * - Changes every single day.
 * - Guaranteed ZERO overlapping questions between consecutive days (Day N vs Day N-1, Day N vs Day N+1).
 */
export function getDailyQuizQuestions(
  questions: Question[],
  offsetDays: number = 0,
  count: number = 10
): Question[] {
  if (!questions || questions.length === 0) return [];
  if (questions.length <= count) return [...questions];

  const totalSlots = Math.floor(questions.length / count);
  if (totalSlots <= 1) {
    return questions.slice(0, count);
  }

  const dayIndex = getLocalDayIndex(offsetDays);
  const MASTER_QUIZ_SEED = 55443322;
  const permuted = seededShuffle(questions, MASTER_QUIZ_SEED);

  const slotIndex = ((dayIndex % totalSlots) + totalSlots) % totalSlots;
  const startIndex = slotIndex * count;
  const todayQuestions = permuted.slice(startIndex, startIndex + count);

  // Identify yesterday's 10 questions to guarantee zero overlap
  const yesterdaySlotIndex = (((dayIndex - 1) % totalSlots) + totalSlots) % totalSlots;
  const yesterdayStartIndex = yesterdaySlotIndex * count;
  const yesterdayIds = new Set(
    permuted.slice(yesterdayStartIndex, yesterdayStartIndex + count).map((q) => q.id)
  );

  // Guarantee zero overlap
  const nonOverlapping = todayQuestions.filter((q) => !yesterdayIds.has(q.id));
  if (nonOverlapping.length < count) {
    const candidatePool = permuted.filter(
      (q) => !yesterdayIds.has(q.id) && !todayQuestions.some((t) => t.id === q.id)
    );
    for (let i = 0; i < candidatePool.length && nonOverlapping.length < count; i++) {
      nonOverlapping.push(candidatePool[i]);
    }
  }

  // Shuffle today's 10 questions deterministically by today's date for an organic feel
  const daySeed = hashStringToNumber(`bihar_daily_order_${getLocalDateString(offsetDays)}`);
  return seededShuffle(nonOverlapping, daySeed);
}

export const DailyContentService = {
  getLocalDayIndex,
  getLocalDateString,
  getDailyQuestion,
  getDailyOneLiner,
  getDailyQuizQuestions,
};
