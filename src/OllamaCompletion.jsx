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

    // Glassmorphism container for a modern look
    const containerStyle = {
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        color: '#f8fafc'
    };

    // Header styles
    const headerStyle = {
        marginBottom: '30px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '15px',
    };
    
    // Status indicator styles with glowing effect
    const getStatusStyle = () => {
        const baseStyle = {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '20px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)'
        };
        
        if (serverStatus === 'checking') {
            return {
                ...baseStyle,
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                color: '#60a5fa',
                border: '1px solid rgba(59, 130, 246, 0.5)'
            };
        } else if (serverStatus === 'connected') {
            return {
                ...baseStyle,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)'
            };
        } else {
            return {
                ...baseStyle,
                backgroundColor: 'rgba(244, 63, 94, 0.15)',
                color: '#fb7185',
                border: '1px solid rgba(244, 63, 94, 0.5)',
                boxShadow: '0 0 15px rgba(244, 63, 94, 0.3)'
            };
        }
    };
    
    // Input area with darker background
    const inputAreaStyle = {
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
    };
    
    // Textarea with better contrast
    const textareaStyle = {
        width: '80%',
        minHeight: '120px',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        border: '1px solid rgba(255, 255, 255, 0.1)', // Changed red to white for better consistency
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)', // Changed to subtle black shadow
        fontSize: '16px',
        fontFamily: 'inherit',
        resize: 'vertical',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        marginBottom: '16px',
        outline: 'none', // Added to remove default focus outline
        '&:focus': {  // Added focus state
            borderColor: '#3b82f6',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(59, 130, 246, 0.2)'
        }
    };
    
    // Glowing button
    const buttonStyle = {
        background: loading 
            ? 'linear-gradient(135deg, #475569, #334155)' 
            : 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600',
        cursor: loading || serverStatus !== 'connected' ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: loading || serverStatus !== 'connected' 
            ? '0 0 0 rgba(59, 130, 246, 0)' 
            : '0 0 20px rgba(59, 130, 246, 0.5)',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    };
    
    // Output area with neumorphic design
    const outputAreaStyle = {
        background: 'rgba(15, 23, 42, 0.7)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: completion ? 'block' : 'none',
        marginTop: '30px'
    };
    
    const outputHeaderStyle = {
        background: 'rgba(30, 41, 59, 0.7)',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#e2e8f0',
        fontWeight: '600',
        fontSize: '18px'
    };
    
    const outputContentStyle = {
        padding: '24px',
        fontSize: '16px',
        lineHeight: '1.7',
        color: '#e2e8f0',
        whiteSpace: 'pre-wrap',
        maxHeight: '500px',
        overflowY: 'auto',
        backgroundColor: '#0f172a',
        borderRadius: '0 0 12px 12px'
    };
    
    // Error style with glow
    const errorStyle = {
        backgroundColor: 'rgba(244, 63, 94, 0.15)',
        color: '#fb7185',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px',
        border: '1px solid rgba(244, 63, 94, 0.5)',
        fontWeight: '500',
        boxShadow: '0 0 15px rgba(244, 63, 94, 0.2)'
    };
    
    // Loading spinner with better animation
    const spinnerContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px'
    };
    
    const spinnerStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '3px solid rgba(59, 130, 246, 0.1)',
        borderTopColor: '#3b82f6',
        animation: 'spin 1s linear infinite',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#f8fafc', margin: '0 0 5px 0' }}>
                    AI Completion with {model}
                </h2>
                <p style={{ margin: '0', color: '#94a3b8' }}>
                    Ask a question or provide a prompt to get a response from Ollama
                </p>
            </div>
            
            <div style={getStatusStyle()}>
                {serverStatus === 'checking' && '🔄 Checking connection to Ollama...'}
                {serverStatus === 'connected' && '✅ Connected to Ollama server'}
                {serverStatus === 'disconnected' && '⚠️ Ollama server is not running. Please start Ollama and refresh.'}
            </div>
            
            <div style={inputAreaStyle}>
                <label htmlFor="prompt" style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#e2e8f0' }}>
                    Your prompt:
                </label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={textareaStyle}
                    placeholder="Enter your prompt here..."
                    disabled={loading}
                />
                <button 
                    onClick={fetchCompletion} 
                    disabled={loading || serverStatus !== 'connected'}
                    style={buttonStyle}
                >
                    {loading ? 'Generating...' : 'Generate Response'}
                </button>
            </div>
            
            {error && (
                <div style={errorStyle}>
                    <strong>Error:</strong> {getErrorMessage(error)}
                </div>
            )}
            
            {loading && (
                <div style={spinnerContainerStyle}>
                    <div style={spinnerStyle}></div>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}
            
            <div style={outputAreaStyle}>
                <div style={outputHeaderStyle}>
                    Response
                </div>
                <div style={outputContentStyle}>
                    {completion}
                </div>
            </div>
        </div>
    );
};

export default OllamaCompletion;