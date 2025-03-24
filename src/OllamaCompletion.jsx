import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { generateCompletion, checkServerStatus } from './api';

const OllamaCompletion = ({ model }) => {
    const [prompt, setPrompt] = useState('Why is the sky blue?');
    const [completion, setCompletion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [serverStatus, setServerStatus] = useState('checking');

    const fetchCompletion = async () => {
        setLoading(true);
        setError(null);
        setCompletion(''); // Clear previous completion

        try {
            console.log('Sending request with model:', model, 'and prompt:', prompt);
            const result = await generateCompletion(model, prompt);
            console.log('Received result:', result);
            
            if (result) {
                setCompletion(result);
            } else {
                setError(new Error('Received empty response from Ollama API'));
            }
        } catch (err) {
            console.error('Error fetching completion:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if Ollama server is running when component mounts
        const checkServer = async () => {
            const status = await checkServerStatus();
            setServerStatus(status.connected ? 'connected' : 'disconnected');
        };
        
        checkServer();
    }, []);

    const getErrorMessage = (error) => {
        if (error?.message?.includes('ECONNREFUSED')) {
            return 'Cannot connect to Ollama server. Please make sure Ollama is running on port 11434.';
        }
        if (error?.response?.status === 404) {
            return `Model "${model}" not found. Please check if it's properly installed with "ollama pull ${model}".`;
        }
        return error?.message || 'An error occurred while fetching completion.';
    };

    // Animation keyframes
    const keyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-green {
            0%, 100% { box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
            50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.7); }
        }
        
        @keyframes pulse-red {
            0%, 100% { box-shadow: 0 0 8px rgba(244, 63, 94, 0.4); }
            50% { box-shadow: 0 0 20px rgba(244, 63, 94, 0.7); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Responsive styles */
        @media (max-width: 768px) {
            .ollama-header h2 {
                font-size: 24px !important;
            }
            .ollama-header p {
                font-size: 14px !important;
            }
            .input-area {
                padding: 20px !important;
            }
            .generate-button {
                padding: 12px 20px !important;
                font-size: 14px !important;
            }
            .response-content {
                padding: 20px !important;
                font-size: 14px !important;
            }
        }

        @media (max-width: 480px) {
            .ollama-header h2 {
                font-size: 20px !important;
            }
            .ollama-container {
                padding: 20px !important;
            }
            .status-indicator {
                font-size: 12px !important;
                padding: 8px 12px !important;
            }
            .input-area {
                padding: 15px !important;
            }
            .response-header {
                padding: 15px !important;
            }
            .response-content {
                padding: 15px !important;
                font-size: 13px !important;
            }
        }
    `;

    return (
        <div className="ollama-container" style={{
            width: '100%',
            height: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            background: 'rgba(30, 41, 59, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
            color: '#f8fafc',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box'
        }}>
            {/* Add responsive styles */}
            <style>{keyframes}</style>
            
            <div className="ollama-header" style={{
                marginBottom: '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '15px',
            }}>
                <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: '700', 
                    background: 'linear-gradient(to right, #f8fafc, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: '0 0 10px 0',
                    letterSpacing: '-0.01em'
                }}>
                    AI Completion with {model}
                </h2>
                <p style={{ margin: '0', color: '#94a3b8', fontSize: '16px' }}>
                    Ask a question or provide a prompt to get a response from Ollama
                </p>
            </div>
            
            <div className="status-indicator" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '20px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
                backgroundColor: serverStatus === 'checking' 
                    ? 'rgba(59, 130, 246, 0.15)' 
                    : serverStatus === 'connected'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(244, 63, 94, 0.15)',
                color: serverStatus === 'checking' 
                    ? '#60a5fa' 
                    : serverStatus === 'connected'
                    ? '#34d399'
                    : '#fb7185',
                border: `1px solid ${serverStatus === 'checking' 
                    ? 'rgba(59, 130, 246, 0.5)' 
                    : serverStatus === 'connected'
                    ? 'rgba(16, 185, 129, 0.5)'
                    : 'rgba(244, 63, 94, 0.5)'}`,
                animation: serverStatus === 'connected'
                    ? 'pulse-green 2s infinite ease-in-out'
                    : serverStatus === 'disconnected'
                    ? 'pulse-red 2s infinite ease-in-out'
                    : 'none'
            }}>
                {serverStatus === 'checking' && '🔄 Checking connection to Ollama...'}
                {serverStatus === 'connected' && '✅ Connected to Ollama server'}
                {serverStatus === 'disconnected' && '⚠️ Ollama server is not running. Please start Ollama and refresh.'}
            </div>
            
            <div className="input-area" style={{
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                padding: '25px',
                borderRadius: '16px',
                marginBottom: '25px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
                position: 'relative',
                flex: '0 0 auto'
            }}>
                <label htmlFor="prompt" style={{ 
                    display: 'block', 
                    marginBottom: '12px', 
                    fontWeight: '500', 
                    color: '#e2e8f0',
                    fontSize: '16px'
                }}>
                    Your prompt:
                </label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.7)',
                        color: '#f8fafc',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
                        fontSize: '16px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        transition: 'all 0.3s ease',
                        marginBottom: '16px',
                        outline: 'none',
                        boxSizing: 'border-box'
                    }}
                    placeholder="Enter your prompt here..."
                    disabled={loading}
                />
                <button 
                    className="generate-button"
                    onClick={fetchCompletion} 
                    disabled={loading || serverStatus !== 'connected'}
                    style={{
                        background: loading 
                            ? 'linear-gradient(90deg, #475569, #334155)' 
                            : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        backgroundSize: '200% auto',
                        color: 'white',
                        padding: '14px 25px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: loading || serverStatus !== 'connected' ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: loading || serverStatus !== 'connected' 
                            ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                            : '0 8px 15px rgba(59, 130, 246, 0.3)',
                        animation: loading || serverStatus !== 'connected'
                            ? 'none'
                            : 'gradient 3s ease infinite',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {loading ? 'Generating...' : 'Generate Response'}
                </button>
            </div>
            
            {error && (
                <div style={{
                    backgroundColor: 'rgba(244, 63, 94, 0.15)',
                    color: '#fb7185',
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    fontWeight: '500',
                    boxShadow: '0 6px 15px rgba(244, 63, 94, 0.2)',
                    animation: 'fadeIn 0.4s ease-out',
                    flex: '0 0 auto'
                }}>
                    <strong>Error:</strong> {getErrorMessage(error)}
                </div>
            )}
            
            {loading && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '30px',
                    flexDirection: 'column',
                    flex: '0 0 auto'
                }}>
                    <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        border: '3px solid rgba(59, 130, 246, 0.1)',
                        borderTopColor: '#3b82f6',
                        borderRightColor: '#8b5cf6',
                        animation: 'spin 1s linear infinite',
                        boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
                        marginBottom: '15px'
                    }}></div>
                    <p style={{ 
                        color: '#94a3b8',
                        margin: '0',
                        fontWeight: '500',
                        fontSize: '16px'
                    }}>
                        Generating your response...
                    </p>
                </div>
            )}
            
            {/* Responsive, flex-growing output area */}
            <div style={{
                background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                opacity: completion ? '1' : '0',
                transform: completion ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease',
                height: completion ? 'auto' : '0',
                marginTop: completion ? '20px' : '0',
                display: completion ? 'flex' : 'none',
                flexDirection: 'column',
                flex: '1 1 auto',
                minHeight: 0
            }}>
                <div className="response-header" style={{
                    background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.9), rgba(30, 41, 59, 0.7))',
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#e2e8f0',
                    fontWeight: '600',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: '0 0 auto'
                }}>
                    <span>Response</span>
                    <span style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        fontWeight: 'normal'
                    }}>Powered by {model}</span>
                </div>
                <div className="response-content" style={{
                    padding: '24px',
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#e2e8f0',
                    whiteSpace: 'pre-wrap',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    borderRadius: '0 0 16px 16px',
                    flex: '1 1 auto',
                    overflow: 'auto',
                    boxSizing: 'border-box'
                }}>
                    {completion}
                </div>
            </div>
        </div>
    );
};

export default OllamaCompletion;