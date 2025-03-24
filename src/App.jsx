import React, { useState } from 'react';
import OllamaCompletion from './OllamaCompletion';
import ApiTestComponent from './ApiTestComponent';
import './App.css';

const App = () => {
  // Use the exact model name as you have it installed on your system
  const modelName = "llama2:latest"; 
  const [showDebugTools, setShowDebugTools] = useState(false);

  return (
    <div className="App" style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      minHeight: '100vh',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <header style={{
        maxWidth: '1000px',
        margin: '0 auto 40px auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '40px',
          fontWeight: '800',
          color: '#f8fafc',
          margin: '0 0 10px 0',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>Ollama Playground</h1>
        
        <p style={{
          fontSize: '18px',
          color: '#94a3b8',
          maxWidth: '600px',
          margin: '0 auto 20px auto'
        }}>A sleek interface for interacting with your Ollama AI models</p>
        
        <button 
          onClick={() => setShowDebugTools(!showDebugTools)}
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid #3b82f6',
            color: '#60a5fa',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        >
          {showDebugTools ? 'Hide Debug Tools' : 'Show Debug Tools'}
        </button>
      </header>
      
      {showDebugTools && <div style={{
        maxWidth: '1000px',
        margin: '0 auto 40px auto',
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <ApiTestComponent />
      </div>}
      
      <main style={{ marginBottom: '40px' }}>
        <OllamaCompletion model={modelName} />
      </main>
      
      <footer style={{
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '14px',
        padding: '20px 0'
      }}>
        <p>
          Make sure you have Ollama running with <code style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>ollama serve</code> and 
          the model installed with <code style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>ollama pull {modelName}</code>
        </p>
      </footer>
    </div>
  );
};

export default App;