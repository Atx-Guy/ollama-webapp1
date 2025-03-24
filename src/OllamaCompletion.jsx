import React, { useState, useEffect } from 'react';
import { generateCompletion } from './api'; // Import the API function

const OllamaCompletion = ({ model }) => {
    const [prompt, setPrompt] = useState('Why is the sky blue?');
    const [completion, setCompletion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [serverStatus, setServerStatus] = useState('unknown');

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
        // Check if Ollama server is running
        fetch('http://localhost:11434/api/version')
            .then(() => setServerStatus('connected'))
            .catch(() => setServerStatus('disconnected'));
    }, []);

    useEffect(() => {
        // Optional: Fetch a completion on initial load, if you want
        // fetchCompletion();
    }, [model, prompt]); // Dependency on model and prompt

    const getErrorMessage = (error) => {
        if (error?.message?.includes('ECONNREFUSED')) {
            return 'Cannot connect to Ollama server. Please make sure Ollama is running on port 11434.';
        }
        return error?.message || 'An error occurred while fetching completion.';
    };

    return (
        <div className="ollama-completion">
            <h2>Ollama Completion</h2>
            {serverStatus === 'disconnected' && (
                <div className="server-status error">
                    ⚠️ Ollama server is not running. Please start Ollama and refresh the page.
                </div>
            )}
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
            {error && <p className="error">Error: {getErrorMessage(error)}</p>}
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