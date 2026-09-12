export type Language = 'hi' | 'en';

export interface BilingualText {
  hi: string;
  en: string;
}

export type QuestionCategory =
  | 'lis_foundations'
  | 'classification_cataloguing'
  | 'reference_sources'
  | 'reference_information_sources'
  | 'automation_ict'
  | 'library_automation_ict'
  | 'management'
  | 'library_management_governance'
  | 'bihar_gk'
  | 'teaching_aptitude'
  | (string & {});

export interface Question {
  id: string;
  category: QuestionCategory;
  question: BilingualText;
  options: {
    A: BilingualText;
    B: BilingualText;
    C: BilingualText;
    D: BilingualText;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: BilingualText;
  difficulty?: 'easy' | 'medium' | 'hard';
  year?: string;
  sourceExam?: string;
  unitNumber?: number; // 1 to 5
  topicId?: string; // e.g. 'u1_t1'
}

export interface Quiz {
  id: string;
  topicId?: string; // 'u1_t1', 'u1_t2', etc.
  unitNumber?: number; // 1 to 5
  setNumber?: number; // 1, 2, 3...
  setName?: BilingualText; // e.g. { hi: 'सेट 1', en: 'Set 1' }
  title: BilingualText;
  subtitle: BilingualText;
  category: 'daily' | 'foundations' | 'classification' | 'automation' | 'bihar_gk' | 'reference' | 'management' | 'teaching' | 'rapid_fire';
  questionCount: number;
  questionIds: string[];
  durationMinutes?: number;
  rewardXP: number;
  badge?: BilingualText;
  difficulty?: 'easy' | 'medium' | 'hard';
  color?: string;
  icon?: string;
}

export interface UserQuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  xpEarned: number;
  timeSpentSeconds: number;
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
}

// Backward compatibility alias for any existing references
export type MockTest = Quiz;
export type UserTestAttempt = UserQuizAttempt;

export interface OneLiner {
  id: string;
  unitNumber?: number; // 1 to 5
  topicId?: string;    // 'u1_t1' ... 'u5_t5'
  category: BilingualText;
  categoryKey: string;
  topic: BilingualText;
  statement: BilingualText;
  tag?: string;
  isImportant?: boolean;
}

export interface StudyUnit {
  id: string;
  unitNumber: number;
  title: BilingualText;
  shortDesc: BilingualText;
  iconName: string;
  topics: {
    id: string;
    title: BilingualText;
    content: BilingualText;
    keyPoints?: BilingualText[];
  }[];
}

export interface Flashcard {
  id: string;
  unitNumber?: number; // 1 to 5
  topicId?: string;    // 'u1_t1' ... 'u5_t5'
  category: BilingualText;
  front: BilingualText;
  back: BilingualText;
  subtext?: BilingualText;
}

export type ActiveTab =
  | 'home'
  | 'quiz'
  | 'tests' // legacy alias for quiz
  | 'oneliners'
  | 'notes'
  | 'flashcards'
  | 'glossary'
  | 'more'
  | 'syllabus'
  | 'bookmarks'
  | 'settings';

export type ScreenView =
  | 'main'
  | 'quiz_active'
  | 'quiz_result'
  | 'test_active'
  | 'test_result'
  | 'note_detail';
