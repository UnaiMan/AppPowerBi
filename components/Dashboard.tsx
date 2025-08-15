import React from 'react';
import type { Level, UserProgress } from '../types';
import ProgressBar from './common/ProgressBar';
import Icon from './common/Icon';

interface DashboardProps {
  levels: Level[];
  userProgress: UserProgress;
  onSelectLevel: (level: Level) => void;
  onClearApiKey: () => void;
}

const LevelCard: React.FC<{ level: Level; userProgress: UserProgress; onSelect: () => void; }> = ({ level, userProgress, onSelect }) => {
    const isUnlocked = userProgress.unlockedLevels.includes(level.id);
    const completedLessons = level.lessons.filter(l => userProgress.completedLessons.includes(l.id)).length;
    const quizCompleted = userProgress.completedQuizzes[level.quiz.id];
    const totalItems = level.lessons.length + 1; // lessons + quiz
    const completedItems = completedLessons + (quizCompleted ? 1 : 0);
    const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    const isLevelComplete = progress === 100;

    const cardClasses = `
        bg-brand-dark-light rounded-lg shadow-lg p-6 flex flex-col justify-between 
        border border-slate-700 transition-all duration-300
        ${isUnlocked ? 'cursor-pointer hover:border-accent hover:shadow-accent/20 hover:-translate-y-1' : 'opacity-50 cursor-not-allowed'}
    `;

    return (
        <div className={cardClasses} onClick={isUnlocked ? onSelect : undefined}>
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{level.title}</h3>
                    <div className="text-2xl">
                        {isUnlocked ? (isLevelComplete ? <Icon name="checkCircle" className="text-brand-primary" /> : <span/>) : <Icon name="lock" className="text-slate-500" />}
                    </div>
                </div>
                <p className="text-brand-light mb-6 text-sm">{level.description}</p>
            </div>
            <div>
                {isUnlocked && (
                    <>
                        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                            <span>Progreso</span>
                            <span>{completedItems} / {totalItems}</span>
                        </div>
                        <ProgressBar progress={progress} />
                    </>
                )}
            </div>
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ levels, userProgress, onSelectLevel, onClearApiKey }) => {
    const totalLessons = levels.reduce((acc, level) => acc + level.lessons.length, 0);
    const totalQuizzes = levels.length;
    const completedLessonsCount = userProgress.completedLessons.length;
    const completedQuizzesCount = Object.values(userProgress.completedQuizzes).filter(q => q.passed).length;
    const totalProgress = Math.round(((completedLessonsCount + completedQuizzesCount) / (totalLessons + totalQuizzes)) * 100);

    return (
        <div className="animate-fade-in">
            <header className="mb-10 text-center relative">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Power BI Mastery Path</h1>
                <p className="mt-4 text-lg text-slate-300">Tu camino para convertirte en un experto en Power BI.</p>
                 <button 
                  onClick={onClearApiKey}
                  className="absolute top-0 right-0 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-1 px-3 rounded-full transition-colors"
                  aria-label="Cambiar clave de API"
                >
                    Cambiar API Key
                </button>
            </header>

            <div className="mb-10 p-6 bg-brand-dark-light rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-white mb-3">Progreso General</h2>
                <ProgressBar progress={totalProgress} />
                <p className="text-right text-sm text-slate-400 mt-2">{totalProgress}% completado</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {levels.map(level => (
                    <LevelCard 
                        key={level.id} 
                        level={level} 
                        userProgress={userProgress} 
                        onSelect={() => onSelectLevel(level)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;