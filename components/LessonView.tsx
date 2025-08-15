import React, { useState, useEffect, useCallback } from 'react';
import type { Lesson, GeneratedLessonContent, GeneratedLessonSection } from '../types';
import { generateLessonContent, generateImageFromPrompt, InvalidApiKeyError } from '../services/geminiService';
import Spinner from './common/Spinner';
import Icon from './common/Icon';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
  onInvalidApiKey: () => void;
}

const ImageGenerator: React.FC<{ section: GeneratedLessonSection, onInvalidApiKey: () => void }> = ({ section, onInvalidApiKey }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchImage = useCallback(async (prompt: string) => {
        setLoading(true);
        setError(null);
        try {
            const url = await generateImageFromPrompt(prompt);
            setImageUrl(url);
        } catch (err) {
            if (err instanceof InvalidApiKeyError) {
                onInvalidApiKey();
                return;
            }
            setError('No se pudo cargar la imagen.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [onInvalidApiKey]);
    
    useEffect(() => {
        if (section.imagePrompt) {
            fetchImage(section.imagePrompt);
        } else {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section.imagePrompt]);

    if (!section.imagePrompt) return null;

    return (
        <div className="my-6 p-4 border border-slate-700 rounded-lg bg-slate-900/50 flex items-center justify-center min-h-[200px]">
            {loading && <Spinner />}
            {error && <p className="text-red-400">{error}</p>}
            {imageUrl && <img src={imageUrl} alt={section.heading} className="rounded-md object-contain max-w-full" />}
        </div>
    );
};

const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete, onBack, onInvalidApiKey }) => {
  const [content, setContent] = useState<GeneratedLessonContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessonContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const lessonContent = await generateLessonContent(lesson.topic);
      setContent(lessonContent);
    } catch (err) {
      if (err instanceof InvalidApiKeyError) {
        onInvalidApiKey();
        return;
      }
      setError('Error al generar el contenido de la lección. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [lesson.topic, onInvalidApiKey]);

  useEffect(() => {
    fetchLessonContent();
  }, [fetchLessonContent]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Spinner />
        <p className="mt-4 text-lg text-slate-300">Generando tu lección personalizada...</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="text-center text-red-400">
        <p>{error}</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-accent text-white rounded hover:bg-sky-500">Volver</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <button onClick={onBack} className="flex items-center mb-6 text-accent hover:text-sky-300 transition-colors">
            <Icon name="arrowLeft" className="mr-2" />
            Volver al Nivel
        </button>

      <article className="prose prose-invert prose-lg max-w-none bg-brand-dark-light p-6 sm:p-8 rounded-lg shadow-xl border border-slate-700">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">{content.title}</h1>
        <p className="text-lg italic text-slate-300">{content.introduction}</p>
        
        {content.sections.map((section, index) => (
          <section key={index} className="mt-8">
            <h2 className="text-2xl font-semibold text-accent border-b border-slate-600 pb-2">{section.heading}</h2>
            <div className="text-slate-300" dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }}></div>
            <ImageGenerator section={section} onInvalidApiKey={onInvalidApiKey} />
          </section>
        ))}
        
        <div className="mt-10 p-4 bg-slate-900/50 rounded-md border border-slate-600">
            <h3 className="text-xl font-semibold text-white">Conclusión</h3>
            <p className="text-slate-300">{content.conclusion}</p>
        </div>
      </article>

      <div className="mt-8 text-center">
        <button 
          onClick={onComplete}
          className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
        >
          Marcar como Completado
        </button>
      </div>
    </div>
  );
};

export default LessonView;