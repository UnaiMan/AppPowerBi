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
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-md bg-brand-dark-light p-8 rounded-lg shadow-2xl border border-slate-700 animate-fade-in">
        <h1 className="text-2xl font-bold text-white text-center mb-2">Power BI Mastery Path</h1>
        <p className="text-center text-slate-300 mb-6">Ingresa tu Clave de API de Google para comenzar</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-400 mb-2">
              Google Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••••••••••••••••••••"
              required
              aria-required="true"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-accent hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!apiKey.trim()}
          >
            Guardar y Continuar
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-6 text-center">
          Tu clave de API se guarda localmente en tu navegador y no se comparte con ningún servidor.
          {' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Obtén tu clave aquí.
          </a>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyPrompt;
