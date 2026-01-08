import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const LoaderIcon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsConfigured(true);
    }
  }, []);

  const saveApiKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsConfigured(true);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!res.ok) {
        throw new Error(`Erreur API: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.candidates && data.candidates[0]) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Réponse invalide de l\'API');
      }
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsConfigured(false);
    setResponse('');
    setError('');
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <DatabaseIcon />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2" style={{color: '#01315E'}}>
            Configuration PromptyBot
          </h1>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Entrez votre clé API Google AI Studio pour commencer
          </p>

          <form onSubmit={saveApiKey} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Clé API Gemini
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                style={{borderColor: '#8C8F94'}}
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                Obtenez votre clé sur{' '}
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2"
              style={{backgroundColor: '#01315E'}}
            >
              <SparklesIcon />
              Commencer
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <DatabaseIcon />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{color: '#01315E'}}>
                  PromptyBot
                </h1>
                <p className="text-sm text-gray-600">
                  Agence CIA - Base de données IA
                </p>
              </div>
            </div>
            <button
              onClick={resetApiKey}
              className="text-sm text-gray-600 hover:text-blue-800 transition-colors"
            >
              Changer la clé
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Votre prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Posez votre question à l'IA..."
                rows={6}
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none resize-none"
                style={{borderColor: '#8C8F94'}}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{backgroundColor: '#01315E'}}
            >
              {loading ? (
                <>
                  <LoaderIcon />
                  Génération en cours...
                </>
              ) : (
                <>
                  <SendIcon />
                  Envoyer
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                ❌ {error}
              </p>
            </div>
          )}

          {response && (
            <div className="mt-6 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{color: '#01315E'}}>
                <SparklesIcon />
                Réponse de l'IA
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {response}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
