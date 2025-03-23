import React, { useState, useEffect } from 'react';
import { generateCompletion } from './api'; // Import the API function

const OllamaCompletion = ({ model }) => {
    const [prompt, setPrompt] = useState('Why is the sky blue?');
    const [completion, setCompletion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCompletion = async () => {
        setLoading(true);
        setError(null);
        setCompletion(''); // Clear previous completion

        try {
            const result = await generateCompletion(model, prompt);
            setCompletion(result);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching completion.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Optional: Fetch a completion on initial load, if you want
        // fetchCompletion();
    }, [model, prompt]); // Dependency on model and prompt

    return (
        <div className="ollama-completion">
            <h2>Ollama Completion</h2>
            <div>
                <label htmlFor="prompt">Prompt:</label>
                <input
                    type="text"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button onClick={fetchCompletion} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Completion'}
                </button>
            </div>
            {error && <p className="error">Error: {error}</p>}
            {loading && <p>Loading completion...</p>}
            {completion && (
                <div className="completion-output">
                    <h3>Completion:</h3>
                    <p>{completion}</p>
                </div>
            )}
        </div>
    );
};

export default OllamaCompletion;