import React, { useState, useEffect } from 'react';
import type { UserProgress } from './types';
import { COURSE_STRUCTURE } from './constants';
import Dashboard from './components/Dashboard';
import LevelDetail from './components/LevelDetail';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';

type View = 'DASHBOARD' | 'LEVEL_DETAIL' | 'LESSON' | 'QUIZ';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const savedProgress = localStorage.getItem('powerBiUserProgress');
      if (savedProgress) {
        return JSON.parse(savedProgress);
      }
    } catch (error) {
      console.error("Could not parse user progress from localStorage", error);
    }
    return {
      completedLessons: [],
      completedQuizzes: {},
      unlockedLevels: [COURSE_STRUCTURE[0].id], // Unlock the first level by default
    };
  });
  
  useEffect(() => {
    try {
      localStorage.setItem('powerBiUserProgress', JSON.stringify(userProgress));
    } catch (error) {
       console.error("Could not save user progress to localStorage", error);
    }
  }, [userProgress]);
  
  const handleSelectLevel = (levelId: string) => {
    setSelectedLevelId(levelId);
    setCurrentView('LEVEL_DETAIL');
  };

  const handleSelectLesson = (lessonId: string, levelId: string) => {
    setSelectedLessonId(lessonId);
    setSelectedLevelId(levelId);
    setCurrentView('LESSON');
  };
  
  const handleSelectQuiz = (quizId: string, levelId: string) => {
    setSelectedQuizId(quizId);
    setSelectedLevelId(levelId);
    setCurrentView('QUIZ');
  };
  
  const handleBackToDashboard = () => {
    setCurrentView('DASHBOARD');
    setSelectedLevelId(null);
  };
  
  const handleBackToLevel = () => {
    setCurrentView('LEVEL_DETAIL');
    setSelectedLessonId(null);
    setSelectedQuizId(null);
  };
  
  const handleCompleteLesson = (lessonId: string) => {
    if (!userProgress.completedLessons.includes(lessonId)) {
        setUserProgress(prev => ({
            ...prev,
            completedLessons: [...prev.completedLessons, lessonId],
        }));
    }
    handleBackToLevel();
  };
  
  const handleCompleteQuiz = (quizId: string, score: number, passed: boolean) => {
    setUserProgress(prev => {
        const newProgress = {
            ...prev,
            completedQuizzes: {
                ...prev.completedQuizzes,
                [quizId]: { score, passed },
            },
        };

        if (passed) {
            const currentLevelIndex = COURSE_STRUCTURE.findIndex(l => l.quiz.id === quizId);
            if (currentLevelIndex !== -1 && currentLevelIndex < COURSE_STRUCTURE.length - 1) {
                const nextLevelId = COURSE_STRUCTURE[currentLevelIndex + 1].id;
                if (!newProgress.unlockedLevels.includes(nextLevelId)) {
                    newProgress.unlockedLevels = [...newProgress.unlockedLevels, nextLevelId];
                }
            }
        }
        return newProgress;
    });
    // The view is handled within the QuizView component until user clicks to go back
  };


  const renderView = () => {
    switch (currentView) {
      case 'LEVEL_DETAIL':
        const level = COURSE_STRUCTURE.find(l => l.id === selectedLevelId);
        if (!level) return <Dashboard userProgress={userProgress} onSelectLevel={handleSelectLevel} />;
        return <LevelDetail level={level} userProgress={userProgress} onSelectLesson={handleSelectLesson} onSelectQuiz={handleSelectQuiz} onBack={handleBackToDashboard} />;
      
      case 'LESSON':
        const lessonLevel = COURSE_STRUCTURE.find(l => l.id === selectedLevelId);
        const lesson = lessonLevel?.lessons.find(l => l.id === selectedLessonId);
        if (!lesson) return <Dashboard userProgress={userProgress} onSelectLevel={handleSelectLevel} />;
        return <LessonView topic={lesson.topic} onComplete={() => handleCompleteLesson(lesson.id)} onBack={handleBackToLevel} />;

      case 'QUIZ':
        const quizLevel = COURSE_STRUCTURE.find(l => l.id === selectedLevelId);
        const quiz = quizLevel?.quiz;
        if (!quiz) return <Dashboard userProgress={userProgress} onSelectLevel={handleSelectLevel} />;
        return <QuizView topic={quiz.topic} questionCount={quiz.questionCount} onComplete={(score, passed) => handleCompleteQuiz(quiz.id, score, passed)} onBack={handleBackToLevel} />;
        
      case 'DASHBOARD':
      default:
        return <Dashboard userProgress={userProgress} onSelectLevel={handleSelectLevel} />;
    }
  };

  return <div className="min-h-screen w-full">{renderView()}</div>;
};

export default App;