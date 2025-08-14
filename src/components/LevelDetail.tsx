
import React from 'react';
import type { Level, UserProgress } from '../types';
import ProgressBar from './common/ProgressBar';

interface LevelDetailProps {
  level: Level;
  userProgress: UserProgress;
  onSelectLesson: (lessonId: string, levelId: string) => void;
  onSelectQuiz: (levelId: string) => void;
  onBack: () => void;
}

const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const QuizIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LevelDetail: React.FC<LevelDetailProps> = ({ level, userProgress, onSelectLesson, onSelectQuiz, onBack }) => {
    const completedLessonsInLevel = level.lessons.filter(l => userProgress.completedLessons.includes(l.id)).length;
    const isQuizPassed = userProgress.completedQuizzes[level.quiz.id]?.passed ?? false;
    const levelProgress = ((completedLessonsInLevel + (isQuizPassed ? 1 : 0)) / (level.lessons.length + 1)) * 100;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        &larr; Volver al Panel
      </button>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-brand-secondary mb-2">{level.title}</h1>
        <p className="text-lg text-gray-300">{level.description}</p>
        <div className="mt-4">
           <ProgressBar progress={levelProgress} />
        </div>
      </header>

      <div className="space-y-4">
        {level.lessons.map(lesson => {
          const isCompleted = userProgress.completedLessons.includes(lesson.id);
          return (
            <div key={lesson.id} onClick={() => onSelectLesson(lesson.id, level.id)} className="flex items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700/80 transition-colors">
              <BookIcon className="h-8 w-8 text-accent mr-4 flex-shrink-0" />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-brand-light">{lesson.title}</h3>
              </div>
              {isCompleted && <CheckCircleIcon className="h-7 w-7 text-green-400 flex-shrink-0" />}
            </div>
          );
        })}
        
        <div onClick={() => onSelectQuiz(level.id)} className="flex items-center p-4 bg-brand-primary/30 rounded-lg cursor-pointer hover:bg-brand-primary/50 transition-colors border-2 border-brand-primary">
          <QuizIcon className="h-8 w-8 text-accent mr-4 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-brand-light">Cuestionario Final del Nivel</h3>
            <p className="text-sm text-gray-300">Demuestra lo que has aprendido.</p>
          </div>
          {isQuizPassed && <CheckCircleIcon className="h-7 w-7 text-green-400 flex-shrink-0" />}
        </div>
      </div>
    </div>
  );
};

export default LevelDetail;
