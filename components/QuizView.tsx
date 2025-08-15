import React, { useState, useEffect, useCallback } from 'react';
import type { Quiz, GeneratedQuiz, QuizQuestion } from '../types';
import { generateQuiz, InvalidApiKeyError } from '../services/geminiService';
import { PASSING_SCORE_PERCENTAGE } from '../constants';
import Spinner from './common/Spinner';
import Icon from './common/Icon';

interface QuizViewProps {
  quiz: Quiz;
  levelId: string;
  onComplete: (score: number, passed: boolean) => void;
  onBack: () => void;
  onInvalidApiKey: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onComplete, onBack, onInvalidApiKey }) => {
  const [quizData, setQuizData] = useState<GeneratedQuiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const fetchQuizData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await generateQuiz(quiz.topic, quiz.questionCount);
      setQuizData(data);
    } catch (err) {
      if (err instanceof InvalidApiKeyError) {
        onInvalidApiKey();
        return;
      }
      setError('Error al generar el cuestionario. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [quiz.topic, quiz.questionCount, onInvalidApiKey]);
  
  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    if (answerIndex === quizData?.questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setShowResults(true);
    }
  };

  const currentQuestion: QuizQuestion | undefined = quizData?.questions[currentQuestionIndex];

  if (loading) {
    return <div className="flex flex-col items-center justify-center min-h-[80vh]"><Spinner /><p className="mt-4 text-lg">Preparando tu cuestionario...</p></div>;
  }

  if (error || !quizData) {
    return <div className="text-center text-red-400"><p>{error}</p><button onClick={onBack} className="mt-4 px-4 py-2 bg-accent text-white rounded hover:bg-sky-500">Volver</button></div>;
  }
  
  const finalScorePercent = Math.round((score / quizData.questions.length) * 100);
  const passed = finalScorePercent >= PASSING_SCORE_PERCENTAGE;

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto text-center p-8 bg-brand-dark-light rounded-lg shadow-xl animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Resultados del Cuestionario</h2>
        <p className={`text-5xl font-extrabold my-6 ${passed ? 'text-brand-primary' : 'text-red-500'}`}>{finalScorePercent}%</p>
        <p className="text-xl text-white mb-2">{passed ? '¡Felicidades, has aprobado!' : 'Necesitas mejorar. ¡Sigue estudiando!'}</p>
        <p className="text-slate-300 mb-8">Obtuviste {score} de {quizData.questions.length} respuestas correctas.</p>
        <button onClick={() => onComplete(finalScorePercent, passed)} className="w-full bg-accent hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">Volver al Nivel</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="p-6 sm:p-8 bg-brand-dark-light rounded-lg shadow-xl border border-slate-700">
        <div className="flex justify-between items-center mb-4 text-slate-400">
          <h2 className="text-xl font-bold text-white">{quizData.title}</h2>
          <span>Pregunta {currentQuestionIndex + 1} de {quizData.questions.length}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
          <div className="bg-accent h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}></div>
        </div>

        {currentQuestion && (
            <div>
                <p className="text-xl text-white mb-6 min-h-[60px]">{currentQuestion.questionText}</p>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = index === currentQuestion.correctAnswerIndex;
                        const isSelected = selectedAnswer === index;
                        let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-200';
                        if (showFeedback) {
                            if (isCorrect) buttonClass += ' bg-green-500/30 border-green-500 text-white';
                            else if (isSelected) buttonClass += ' bg-red-500/30 border-red-500 text-white';
                            else buttonClass += ' bg-slate-700 border-slate-600 text-slate-400';
                        } else {
                            buttonClass += ' bg-slate-700 border-slate-600 text-brand-light hover:bg-slate-600 hover:border-accent';
                        }

                        return (
                            <button key={index} onClick={() => handleAnswerSelect(index)} disabled={showFeedback} className={buttonClass}>
                                {option}
                            </button>
                        );
                    })}
                </div>
                {showFeedback && (
                    <div className="mt-6 p-4 bg-slate-800/70 rounded-lg border border-slate-600 animate-fade-in">
                        <p className="font-bold text-white mb-2">Explicación:</p>
                        <p className="text-slate-300">{currentQuestion.explanation}</p>
                    </div>
                )}
                {showFeedback && (
                     <button onClick={handleNext} className="w-full mt-6 bg-accent hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        {currentQuestionIndex < quizData.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;