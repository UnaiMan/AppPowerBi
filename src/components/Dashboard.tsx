import React from 'react';
import type { UserProgress } from '../types';
import { COURSE_STRUCTURE } from '../constants';
import ProgressBar from './common/ProgressBar';

interface DashboardProps {
  userProgress: UserProgress;
  onSelectLevel: (levelId: string) => void;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);


const Dashboard: React.FC<DashboardProps> = ({ userProgress, onSelectLevel }) => {
  const totalItems = COURSE_STRUCTURE.flatMap(l => [...l.lessons, l.quiz]).length;
  const completedItems = userProgress.completedLessons.length + Object.values(userProgress.completedQuizzes).filter(q => q.passed).length;
  const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-light mb-2">Power BI Mastery Path</h1>
        <p className="text-lg text-brand-secondary">Tu viaje para convertirte en un experto en Power BI.</p>
      </header>
      
      <div className="bg-brand-dark/50 rounded-lg p-6 mb-8 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-3">Progreso Total</h2>
        <ProgressBar progress={overallProgress} />
        <p className="text-right mt-2 text-sm text-gray-400">{Math.round(overallProgress)}% Completado</p>
      </div>

      <div className="grid gap-6">
        {COURSE_STRUCTURE.map((level) => {
          const isUnlocked = userProgress.unlockedLevels.includes(level.id);
          const completedLessonsInLevel = level.lessons.filter(l => userProgress.completedLessons.includes(l.id)).length;
          const isQuizPassed = userProgress.completedQuizzes[level.quiz.id]?.passed ?? false;
          const levelProgress = ((completedLessonsInLevel + (isQuizPassed ? 1 : 0)) / (level.lessons.length + 1)) * 100;

          return (
            <div
              key={level.id}
              onClick={() => isUnlocked && onSelectLevel(level.id)}
              className={`p-6 rounded-lg shadow-md transition-all duration-300 ${isUnlocked ? 'bg-gray-800 hover:bg-gray-700/80 cursor-pointer border border-gray-700' : 'bg-gray-900/50 border border-gray-800'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-2xl font-bold ${isUnlocked ? 'text-brand-secondary' : 'text-gray-500'}`}>{level.title}</h3>
                  <p className={`mt-1 ${isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>{level.description}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {!isUnlocked ? (
                     <LockIcon className="h-8 w-8 text-gray-600" />
                  ) : levelProgress === 100 ? (
                    <CheckIcon className="h-8 w-8 text-green-400" />
                  ) : (
                    <span className="text-lg font-bold text-accent">{`${Math.round(levelProgress)}%`}</span>
                  )}
                </div>
              </div>
               {isUnlocked && <div className="mt-4">
                  <ProgressBar progress={levelProgress} />
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;