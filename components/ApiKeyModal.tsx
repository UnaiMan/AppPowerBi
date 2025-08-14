import React, { useState } from 'react';

interface ApiKeyModalProps {
  onKeySubmit: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('Por favor, introduce una clave de API válida.');
      return;
    }
    setError('');
    onKeySubmit(apiKey.trim());
  };

  return (
    <div className="fixed inset-0 bg-brand-dark bg-opacity-95 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl max-w-md w-full border border-gray-700">
        <h2 className="text-2xl font-bold text-brand-light mb-4 text-center">Introduce tu Clave de API de Google</h2>
        <p className="text-gray-400 mb-6 text-center">
          Para usar esta aplicación, necesitas tu propia clave de API de Google AI Studio.
          Puedes obtener una gratis en{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-semibold"
          >
            Google AI Studio
          </a>.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-brand-light font-semibold mb-2">
              Clave de API
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-brand-light focus:ring-2 focus:ring-accent focus:outline-none"
              placeholder="Pega tu clave de API aquí"
              aria-label="API Key Input"
            />
          </div>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand-secondary hover:bg-brand-primary text-brand-dark font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Guardar y Empezar
          </button>
        </form>
         <p className="text-xs text-gray-500 mt-4 text-center">
          Tu clave de API se guarda de forma segura en el almacenamiento local de tu navegador y no se comparte con nadie.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyModal;
