import React, { useState } from 'react';
import type { Level, Lesson, Quiz } from './types';
import { AppView } from './types';
import { COURSE_STRUCTURE } from './constants';
import Dashboard from './components/Dashboard';
import LevelDetail from './components/LevelDetail';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import { useUserProgress } from './hooks/useUserProgress';

const API_KEY_STORAGE_KEY = 'google-api-key';

export default function App(): React.ReactNode {
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem(API_KEY_STORAGE_KEY));
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  const {
    userProgress,
    completeLesson,
    completeQuiz,
    isLevelUnlocked,
  } = useUserProgress();

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    setApiKey(key);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey(null);
  };

  const handleSelectLevel = (level: Level) => {
    if (isLevelUnlocked(level.id)) {
      setCurrentLevel(level);
      setView(AppView.LEVEL_DETAIL);
    }
  };

  const handleSelectLesson = (lesson: Lesson, level: Level) => {
    setCurrentLesson(lesson);
    setCurrentLevel(level);
    setView(AppView.LESSON);
  };

  const handleSelectQuiz = (quiz: Quiz, level: Level) => {
    setCurrentQuiz(quiz);
    setCurrentLevel(level);
    setView(AppView.QUIZ);
  };

  const navigateToDashboard = () => {
    setView(AppView.DASHBOARD);
    setCurrentLevel(null);
    setCurrentLesson(null);
    setCurrentQuiz(null);
  };

  const navigateToLevelDetail = () => {
    if (currentLevel) {
      setView(AppView.LEVEL_DETAIL);
      setCurrentLesson(null);
      setCurrentQuiz(null);
    } else {
      navigateToDashboard();
    }
  };

  if (!apiKey) {
    return <ApiKeyPrompt onApiKeySubmit={handleApiKeySubmit} />;
  }

  const renderContent = (): React.ReactNode => {
    switch (view) {
      case AppView.LEVEL_DETAIL:
        return currentLevel ? (
          <LevelDetail
            level={currentLevel}
            userProgress={userProgress}
            onSelectLesson={(lesson) => handleSelectLesson(lesson, currentLevel)}
            onSelectQuiz={(quiz) => handleSelectQuiz(quiz, currentLevel)}
            onBack={navigateToDashboard}
          />
        ) : null;
      case AppView.LESSON:
        return currentLesson && currentLevel ? (
          <LessonView
            lesson={currentLesson}
            onComplete={() => {
              completeLesson(currentLesson.id);
              navigateToLevelDetail();
            }}
            onBack={navigateToLevelDetail}
          />
        ) : null;
      case AppView.QUIZ:
        return currentQuiz && currentLevel ? (
          <QuizView
            quiz={currentQuiz}
            levelId={currentLevel.id}
            onComplete={(score, passed) => {
              completeQuiz(currentQuiz.id, score, passed, currentLevel.id);
              navigateToLevelDetail();
            }}
            onBack={navigateToLevelDetail}
          />
        ) : null;
      case AppView.DASHBOARD:
      default:
        return (
          <Dashboard
            levels={COURSE_STRUCTURE}
            userProgress={userProgress}
            onSelectLevel={handleSelectLevel}
            onClearApiKey={handleClearApiKey}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark p-4 sm:p-6 md:p-8">
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}