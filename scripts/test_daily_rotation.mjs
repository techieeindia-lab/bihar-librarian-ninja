import { QUESTIONS } from '../src/data/questions';
import { ONE_LINERS } from '../src/data/oneLiners';
import {
  getLocalDayIndex,
  getLocalDateString,
  getDailyQuestion,
  getDailyOneLiner,
  getDailyQuizQuestions,
} from '../src/services/dailyContentService';

console.log('--- Testing Daily Rotation & Zero Consecutive Overlap ---');

console.log(`Available Total Questions: ${QUESTIONS.length}`);
console.log(`Available Total One-Liners: ${ONE_LINERS.length}`);
console.log(`Today's Local Date: ${getLocalDateString(0)}`);
console.log(`Today's Day Index: ${getLocalDayIndex(0)}`);

let allTestsPassed = true;

// 1. Test Determinism (idempotency on the same day)
const todayQ1 = getDailyQuestion(QUESTIONS, 0);
const todayQ2 = getDailyQuestion(QUESTIONS, 0);
if (todayQ1?.id !== todayQ2?.id) {
  console.error('FAIL: Daily question is not deterministic for the same day!');
  allTestsPassed = false;
} else {
  console.log('PASS: Daily question is deterministic on the same day.');
}

const todayOl1 = getDailyOneLiner(ONE_LINERS, 0);
const todayOl2 = getDailyOneLiner(ONE_LINERS, 0);
if (todayOl1?.id !== todayOl2?.id) {
  console.error('FAIL: Daily one-liner is not deterministic for the same day!');
  allTestsPassed = false;
} else {
  console.log('PASS: Daily one-liner is deterministic on the same day.');
}

const todayQuiz1 = getDailyQuizQuestions(QUESTIONS, 0, 10);
const todayQuiz2 = getDailyQuizQuestions(QUESTIONS, 0, 10);
const idsQuiz1 = todayQuiz1.map((q) => q.id).join(',');
const idsQuiz2 = todayQuiz2.map((q) => q.id).join(',');
if (idsQuiz1 !== idsQuiz2) {
  console.error('FAIL: Daily quiz is not deterministic for the same day!');
  allTestsPassed = false;
} else {
  console.log('PASS: Daily quiz questions are 100% deterministic on the same day.');
}

// 2. Test 30 Consecutive Days of Daily Questions
let consecutiveQMatches = 0;
for (let d = 0; d < 30; d++) {
  const currentQ = getDailyQuestion(QUESTIONS, d);
  const nextQ = getDailyQuestion(QUESTIONS, d + 1);
  if (currentQ?.id === nextQ?.id) {
    console.error(`FAIL: Day ${d} and Day ${d + 1} have the same daily question: ${currentQ?.id}`);
    consecutiveQMatches++;
    allTestsPassed = false;
  }
}
if (consecutiveQMatches === 0) {
  console.log('PASS: 30 consecutive days verified: Daily question changes every day without consecutive repeats.');
}

// 3. Test 30 Consecutive Days of Daily One-Liners
let consecutiveOlMatches = 0;
for (let d = 0; d < 30; d++) {
  const currentOl = getDailyOneLiner(ONE_LINERS, d);
  const nextOl = getDailyOneLiner(ONE_LINERS, d + 1);
  if (currentOl?.id === nextOl?.id) {
    console.error(`FAIL: Day ${d} and Day ${d + 1} have the same daily one-liner: ${currentOl?.id}`);
    consecutiveOlMatches++;
    allTestsPassed = false;
  }
}
if (consecutiveOlMatches === 0) {
  console.log('PASS: 30 consecutive days verified: Daily one-liner changes every day without consecutive repeats.');
}

// 4. Test 30 Consecutive Days of 10-Question Daily Quiz
let consecutiveQuizOverlaps = 0;
for (let d = 0; d < 30; d++) {
  const dayA = getDailyQuizQuestions(QUESTIONS, d, 10);
  const dayB = getDailyQuizQuestions(QUESTIONS, d + 1, 10);

  if (dayA.length !== 10) {
    console.error(`FAIL: Day ${d} did not return 10 questions! Returned: ${dayA.length}`);
    allTestsPassed = false;
  }
  if (dayB.length !== 10) {
    console.error(`FAIL: Day ${d + 1} did not return 10 questions! Returned: ${dayB.length}`);
    allTestsPassed = false;
  }

  const setA = new Set(dayA.map((q) => q.id));
  const overlapping = dayB.filter((q) => setA.has(q.id));

  if (overlapping.length > 0) {
    console.error(
      `FAIL: Overlap found between Day ${d} (${getLocalDateString(d)}) and Day ${d + 1} (${getLocalDateString(
        d + 1
      )}): ${overlapping.map((q) => q.id).join(', ')}`
    );
    consecutiveQuizOverlaps++;
    allTestsPassed = false;
  }
}

if (consecutiveQuizOverlaps === 0) {
  console.log('PASS: 30 consecutive days verified: 0 overlapping questions between consecutive daily quiz sets!');
}

// 5. Sample Output for Today, Yesterday, and Tomorrow
console.log('\n--- Simulation Sample ---');
console.log(`[Yesterday: ${getLocalDateString(-1)}]`);
console.log(`- Question: ${getDailyQuestion(QUESTIONS, -1)?.question?.hi?.slice(0, 50)}...`);
console.log(`- One-Liner: ${getDailyOneLiner(ONE_LINERS, -1)?.statement?.hi?.slice(0, 50)}...`);
console.log(`- Quiz Qs: ${getDailyQuizQuestions(QUESTIONS, -1, 10).map((q) => q.id).join(', ')}`);

console.log(`\n[Today: ${getLocalDateString(0)}]`);
console.log(`- Question: ${getDailyQuestion(QUESTIONS, 0)?.question?.hi?.slice(0, 50)}...`);
console.log(`- One-Liner: ${getDailyOneLiner(ONE_LINERS, 0)?.statement?.hi?.slice(0, 50)}...`);
console.log(`- Quiz Qs: ${getDailyQuizQuestions(QUESTIONS, 0, 10).map((q) => q.id).join(', ')}`);

console.log(`\n[Tomorrow: ${getLocalDateString(1)}]`);
console.log(`- Question: ${getDailyQuestion(QUESTIONS, 1)?.question?.hi?.slice(0, 50)}...`);
console.log(`- One-Liner: ${getDailyOneLiner(ONE_LINERS, 1)?.statement?.hi?.slice(0, 50)}...`);
console.log(`- Quiz Qs: ${getDailyQuizQuestions(QUESTIONS, 1, 10).map((q) => q.id).join(', ')}`);

if (allTestsPassed) {
  console.log('\n✅ ALL VERIFICATION CHECKS PASSED!');
  process.exit(0);
} else {
  console.error('\n❌ SOME VERIFICATION CHECKS FAILED!');
  process.exit(1);
}
