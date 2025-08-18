import { useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '../types';
import { COURSE_STRUCTURE } from '../constants';

const PROGRESS_KEY = 'power-bi-mastery-progress';

const getDefaultProgress = (): UserProgress => ({
  completedLessons: [],
  completedQuizzes: {},
  unlockedLevels: [COURSE_STRUCTURE[0].id], // Unlock the first level by default
});

export const useUserProgress = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      return savedProgress ? JSON.parse(savedProgress) : getDefaultProgress();
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
      return getDefaultProgress();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(userProgress));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, [userProgress]);

  const completeLesson = useCallback((lessonId: string) => {
    setUserProgress(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
    }));
  }, []);

  const completeQuiz = useCallback((quizId: string, score: number, passed: boolean, levelId: string) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      newProgress.completedQuizzes = {
        ...newProgress.completedQuizzes,
        [quizId]: { score, passed },
      };

      if (passed) {
        const currentLevelIndex = COURSE_STRUCTURE.findIndex(l => l.id === levelId);
        if (currentLevelIndex !== -1 && currentLevelIndex < COURSE_STRUCTURE.length - 1) {
          const nextLevelId = COURSE_STRUCTURE[currentLevelIndex + 1].id;
          newProgress.unlockedLevels = [...new Set([...newProgress.unlockedLevels, nextLevelId])];
        }
      }
      return newProgress;
    });
  }, []);

  const isLevelUnlocked = useCallback((levelId: string): boolean => {
    return userProgress.unlockedLevels.includes(levelId);
  }, [userProgress.unlockedLevels]);
  
  const resetProgress = useCallback(() => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
        localStorage.removeItem(PROGRESS_KEY);
        setUserProgress(getDefaultProgress());
    }
  }, []);

  return { userProgress, completeLesson, completeQuiz, isLevelUnlocked, resetProgress };
};
