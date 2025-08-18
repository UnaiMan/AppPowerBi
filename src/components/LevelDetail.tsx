import React from 'react';
import type { Level, UserProgress, Lesson, Quiz } from '../types';
import Icon from './common/Icon';

interface LevelDetailProps {
  level: Level;
  userProgress: UserProgress;
  onSelectLesson: (lesson: Lesson) => void;
  onSelectQuiz: (quiz: Quiz) => void;
  onBack: () => void;
}


const LevelDetail: React.FC<LevelDetailProps> = ({ level, userProgress, onSelectLesson, onSelectQuiz, onBack }) => {
    const isQuizCompleted = !!userProgress.completedQuizzes[level.quiz.id];
    const quizPassed = userProgress.completedQuizzes[level.quiz.id]?.passed;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center mb-6 text-accent hover:text-sky-300 transition-colors">
                <Icon name="arrowLeft" className="mr-2" />
                Volver al Panel
            </button>
            
            <header className="mb-8 p-6 bg-brand-dark-light rounded-lg shadow-lg border border-slate-700">
                <h1 className="text-3xl font-bold text-white">{level.title}</h1>
                <p className="mt-2 text-slate-300">{level.description}</p>
            </header>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white border-b border-slate-600 pb-2">Lecciones</h2>
                <ul className="space-y-3">
                    {level.lessons.map(lesson => (
                        <li key={lesson.id}>
                           <button
                                onClick={() => onSelectLesson(lesson)}
                                className="w-full flex items-center justify-between p-4 bg-brand-dark-light rounded-md border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors duration-200 text-left"
                            >
                                <div className="flex items-center">
                                    <div className="text-accent mr-4"><Icon name="bookOpen" /></div>
                                    <span className="text-white">{lesson.title}</span>
                                </div>
                                {userProgress.completedLessons.includes(lesson.id) && <Icon name="checkCircle" className="text-brand-primary flex-shrink-0" />}
                            </button>
                        </li>
                    ))}
                </ul>

                <h2 className="text-2xl font-semibold text-white border-b border-slate-600 pb-2 pt-6">Cuestionario Final</h2>
                <ul className="space-y-3">
                     <li>
                        <button
                            onClick={() => onSelectQuiz(level.quiz)}
                            className="w-full flex items-center justify-between p-4 bg-brand-dark-light rounded-md border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors duration-200 text-left"
                        >
                            <div className="flex items-center">
                                <div className="text-accent mr-4"><Icon name="quiz"/></div>
                                <span className="text-white">Cuestionario: {level.title}</span>
                            </div>
                            {isQuizCompleted && (
                                <Icon name="checkCircle" className={`${quizPassed ? "text-brand-primary" : "text-red-500"} flex-shrink-0`} />
                            )}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LevelDetail;
