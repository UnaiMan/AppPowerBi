export interface Lesson {
  id: string;
  title: string;
  topic: string;
}

export interface Quiz {
  id: string;
  topic: string;
  questionCount: number;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz;
}

export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: { [quizId: string]: { score: number; passed: boolean } };
  unlockedLevels: string[];
}

export interface GeneratedLessonSection {
  heading: string;
  content: string;
  imagePrompt?: string;
}

export interface GeneratedLessonContent {
  title: string;
  introduction: string;
  sections: GeneratedLessonSection[];
  conclusion: string;
}

export interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface GeneratedQuiz {
  title: string;
  questions: QuizQuestion[];
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  LEVEL_DETAIL = 'LEVEL_DETAIL',
  LESSON = 'LESSON',
  QUIZ = 'QUIZ',
}
