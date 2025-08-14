/// <reference types="vite/client" />

export interface Lesson {
  id: string;
  title: string;
  topic: string; // The topic to be sent to Gemini
}

export interface Level {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: {
    id: string;
    topic: string;
    questionCount: number;
  };
}

export interface LessonSection {
  heading: string;
  content: string;
  imagePrompt?: string;
}

export interface GeneratedLessonContent {
  title:string;
  introduction: string;
  sections: LessonSection[];
  conclusion: string;
}

export interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface GeneratedQuizContent {
  title: string;
  questions: QuizQuestion[];
}

export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: { [quizId: string]: { score: number; passed: boolean } };
  unlockedLevels: string[];
}