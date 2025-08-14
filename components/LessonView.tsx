import React, { useState, useEffect, useCallback } from 'react';
import type { GeneratedLessonContent } from '../types';
import { generateLessonContent, generateImageFromPrompt } from '../services/geminiService';
import Spinner from './common/Spinner';

interface LessonViewProps {
  topic: string;
  onComplete: () => void;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ topic, onComplete, onBack }) => {
  const [content, setContent] = useState<GeneratedLessonContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<Record<number, string | 'error'>>({});
  const [generatingImages, setGeneratingImages] = useState<Record<number, boolean>>({});

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setContent(null);
    setImages({});
    setGeneratingImages({});

    try {
      const lessonContent = await generateLessonContent(topic);
      setContent(lessonContent);

      if (lessonContent?.sections) {
        lessonContent.sections.forEach((section, index) => {
          if (section.imagePrompt) {
            setGeneratingImages(prev => ({ ...prev, [index]: true }));
            generateImageFromPrompt(section.imagePrompt)
              .then(imageUrl => {
                setImages(prev => ({ ...prev, [index]: imageUrl }));
              })
              .catch(e => {
                console.error(`Failed to generate image for section ${index}:`, e);
                setImages(prev => ({ ...prev, [index]: 'error' }));
              })
              .finally(() => {
                setGeneratingImages(prev => ({ ...prev, [index]: false }));
              });
          }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center"><Spinner /><p className="mt-4 text-lg">Generando lección con IA... ¡Un momento!</p></div>;
    }

    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button onClick={fetchContent} className="mt-4 bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Reintentar
          </button>
        </div>
      );
    }
    
    if (!content) {
      return <p className="text-center">No se pudo cargar el contenido.</p>;
    }

    return (
      <article className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:text-brand-light prose-h1:text-brand-secondary prose-strong:text-accent prose-a:text-brand-secondary">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        <p className="text-xl italic">{content.introduction}</p>
        
        {content.sections.map((section, index) => (
          <section key={index} className="mt-8">
            <h2 className="text-3xl font-semibold border-b-2 border-brand-primary/50 pb-2 mb-4">{section.heading}</h2>
            <div className="space-y-4" dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }}></div>
            
            {section.imagePrompt && (
              <div className="mt-6 border border-gray-700 rounded-lg p-2 bg-gray-900/50 not-prose">
                {generatingImages[index] ? (
                  <div className="flex flex-col items-center justify-center h-80 bg-gray-800 rounded-md animate-pulse">
                      <Spinner />
                      <p className="mt-2 text-sm text-gray-400">Generando imagen ilustrativa...</p>
                  </div>
                ) : images[index] && images[index] !== 'error' ? (
                  <a href={images[index] as string} target="_blank" rel="noopener noreferrer" title="Ver imagen en tamaño completo">
                    <img src={images[index] as string} alt={`Ilustración para ${section.heading}`} className="w-full h-auto rounded-md object-contain" />
                  </a>
                ) : (
                  <div className="flex flex-col items-center justify-center h-80 bg-gray-800 rounded-md">
                      <p className="text-red-400 font-semibold">No se pudo cargar la imagen.</p>
                      <p className="text-gray-500 text-sm mt-2">Es posible que el contenido solicitado viole las políticas de seguridad.</p>
                  </div>
                )}
              </div>
            )}

          </section>
        ))}
        
        <section className="mt-12 p-6 bg-brand-primary/20 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Conclusión</h2>
            <p>{content.conclusion}</p>
        </section>
      </article>
    );
  };
  
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            &larr; Volver al Nivel
          </button>
          {!isLoading && !error && (
            <button onClick={onComplete} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg">
                Marcar como Completado
            </button>
          )}
      </div>
      <div className="bg-gray-800/50 p-6 md:p-8 rounded-lg shadow-2xl border border-gray-700">
        {renderContent()}
      </div>
    </div>
  );
};

export default LessonView;