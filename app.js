import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const API_KEY = prompt('Entrez votre clé API Google AI Studio:') || '';

function App() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                }
            );
            
            const data = await res.json();
            setResponse(data.candidates[0].content.parts[0].text);
        } catch (error) {
            setResponse('Erreur: ' + error.message);
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-heading font-bold text-cia-main mb-8">
                Agence CIA - PromptyBot
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full p-4 border-2 border-cia-gray-3 rounded-lg focus:border-cia-main focus:outline-none"
                    rows={4}
                    placeholder="Entrez votre prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-cia-main text-white px-6 py-3 rounded-lg hover:bg-cia-mid transition-colors disabled:opacity-50"
                >
                    {loading ? 'Chargement...' : 'Envoyer'}
                </button>
            </form>
            {response && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-cia-gray-3">
                    <h3 className="font-heading font-semibold text-cia-main mb-2">Réponse:</h3>
                    <p className="whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
