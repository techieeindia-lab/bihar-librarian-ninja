export type Language = 'hi' | 'en';

export interface BilingualText {
  hi: string;
  en: string;
}

export interface Question {
  id: string;
  category: 'lis_foundations' | 'classification_cataloguing' | 'reference_sources' | 'automation_ict' | 'management' | 'bihar_gk' | 'teaching_aptitude';
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
}

export interface MockTest {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  questionCount: number;
  questionIds: string[];
  type: 'full_length' | 'sectional' | 'pyq';
  badge?: BilingualText;
}

export interface UserTestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  timeSpentSeconds: number;
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
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
  category: BilingualText;
  front: BilingualText;
  back: BilingualText;
  subtext?: BilingualText;
}

export type ActiveTab = 'home' | 'tests' | 'notes' | 'flashcards' | 'more' | 'syllabus' | 'bookmarks' | 'settings';
export type ScreenView = 'main' | 'test_active' | 'test_result' | 'note_detail';

