import React, { useState } from 'react';

interface ApiKeyPromptProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-dark bg-opacity-90 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-brand-dark-light p-8 rounded-lg shadow-2xl border border-slate-700 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ingresa tu Clave de API de Google Gemini</h2>
        <p className="text-slate-400 mb-6">
          Para generar contenido, la aplicación necesita tu clave de API de Google Gemini. No te preocupes, se guardará de forma segura en tu navegador.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Introduce tu clave de API aquí"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full mt-4 bg-accent hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Guardar y Continuar
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4">
          Puedes obtener tu clave en <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-accent underline">Google AI Studio</a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyPrompt;