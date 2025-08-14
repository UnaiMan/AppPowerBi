import React, { useState, useEffect, useCallback } from 'react';
import type { GeneratedQuizContent, QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';
import Spinner from './common/Spinner';

interface QuizViewProps {
  topic: string;
  questionCount: number;
  onComplete: (score: number, passed: boolean) => void;
  onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ topic, questionCount, onComplete, onBack }) => {
  const [quiz, setQuiz] = useState<GeneratedQuizContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const PASS_PERCENTAGE = 60;

  const fetchQuiz = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const quizContent = await generateQuiz(topic, questionCount);
      if (quizContent.questions.length > 0) {
        setQuiz(quizContent);
      } else {
        setError("La IA no pudo generar preguntas. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, questionCount]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === quiz!.questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScorePercent = (score / quiz!.questions.length) * 100;
      onComplete(finalScorePercent, finalScorePercent >= PASS_PERCENTAGE);
    }
  };

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return "bg-gray-700 hover:bg-gray-600";
    }
    const currentQuestion = quiz!.questions[currentQuestionIndex];
    if (index === currentQuestion.correctAnswerIndex) {
      return "bg-green-600";
    }
    if (index === selectedAnswer) {
      return "bg-red-600";
    }
    return "bg-gray-800 opacity-50";
  };
  
  if (isLoading) {
    return (
        <div className="p-8 max-w-2xl mx-auto text-center">
            <Spinner />
            <p className="mt-4 text-lg">Creando tu cuestionario personalizado...</p>
        </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center text-red-400 bg-red-900/50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
        <button onClick={fetchQuiz} className="mt-4 bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-4 rounded-lg">
          Reintentar
        </button>
      </div>
    );
  }
  
  if (isFinished) {
    const finalScorePercent = Math.round((score / quiz!.questions.length) * 100);
    const passed = finalScorePercent >= PASS_PERCENTAGE;

    return (
      <div className="p-8 max-w-2xl mx-auto text-center bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Cuestionario Completado</h2>
        <p className={`text-5xl font-bold mb-4 ${passed ? 'text-green-400' : 'text-red-400'}`}>{finalScorePercent}%</p>
        <p className="text-xl mb-6">{passed ? '¡Felicidades! Has aprobado.' : 'Necesitas repasar un poco más.'}</p>
        <p className="text-gray-400 mb-8">Respondiste correctamente {score} de {quiz!.questions.length} preguntas.</p>
        <button onClick={onBack} className="bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-6 rounded-lg text-lg">
          Volver al Nivel
        </button>
      </div>
    )
  }

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
       <button onClick={onBack} className="mb-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        &larr; Salir del Cuestionario
      </button>
      <div className="bg-gray-800/70 p-6 md:p-8 rounded-lg shadow-2xl border border-gray-700">
        <div className="mb-6">
          <p className="text-sm text-brand-secondary font-semibold">Pregunta {currentQuestionIndex + 1} de {quiz.questions.length}</p>
          <h2 className="text-2xl md:text-3xl font-semibold mt-1">{currentQuestion.questionText}</h2>
        </div>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg text-lg transition-all duration-300 ${getButtonClass(index)}`}
            >
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-6 p-4 rounded-lg bg-gray-900 border border-gray-700">
            <p className="font-bold text-lg mb-2">Explicación:</p>
            <p className="text-gray-300">{currentQuestion.explanation}</p>
            <button onClick={handleNextQuestion} className="w-full mt-4 bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-6 rounded-lg text-lg">
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;