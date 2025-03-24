import React, { useState } from 'react';
import OllamaCompletion from './OllamaCompletion';
import ApiTestComponent from './ApiTestComponent';

const App = () => {
  const modelName = "llama2:latest"; 
  const [showDebugTools, setShowDebugTools] = useState(false);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Hero background elements - animated gradients - full screen */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '-10%',
        width: '80%',
        height: '150%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: '0',
        animation: 'pulse 15s infinite alternate ease-in-out'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-5%',
        width: '70%',
        height: '140%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 30%, transparent 65%)',
        filter: 'blur(80px)',
        zIndex: '0',
        animation: 'pulse 18s infinite alternate-reverse ease-in-out'
      }}></div>

      <div style={{
        position: 'absolute',
        top: '10%',
        left: '30%',
        width: '40%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(244, 63, 94, 0.05) 0%, rgba(239, 68, 68, 0.02) 40%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: '0',
        animation: 'pulse 20s infinite alternate ease-in-out'
      }}></div>
      
      {/* Animation keyframes */}
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .header-title {
            font-size: 36px !important;
          }
          .header-subtitle {
            font-size: 16px !important;
          }
          .content-wrapper {
            padding: 20px 15px !important;
          }
        }

        @media (max-width: 480px) {
          .header-title {
            font-size: 28px !important;
          }
          .header-subtitle {
            font-size: 14px !important;
          }
          .content-wrapper {
            padding: 15px 10px !important;
          }
        }
      `}</style>

      {/* Content wrapper - flex to fill full height */}
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: '1',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        boxSizing: 'border-box',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header section */}
        <header style={{
          width: '100%',
          padding: '10px 0 30px 0',
          textAlign: 'center',
          animation: 'fadeIn 1s ease-out'
        }}>
          <h1 className="header-title" style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#f8fafc',
            margin: '0 0 15px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.02em'
          }}>Ollama Playground</h1>
          
          <p className="header-subtitle" style={{
            fontSize: '18px',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto 20px auto',
            lineHeight: '1.6'
          }}>A sleek interface for interacting with your Ollama AI models</p>
          
          <button 
            onClick={() => setShowDebugTools(!showDebugTools)}
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            {showDebugTools ? 'Hide Debug Tools' : 'Show Debug Tools'}
          </button>
        </header>
        
        {/* Debug tools */}
        {showDebugTools && <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto 30px auto',
          background: 'rgba(30, 41, 59, 0.7)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'fadeIn 0.5s ease-out',
          boxSizing: 'border-box'
        }}>
          <ApiTestComponent />
        </div>}
        
        {/* Main content - flex-grow to fill available space */}
        <main style={{ 
          width: '100%',
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.8s ease-out',
          animationDelay: '0.2s',
          animationFillMode: 'both',
          overflow: 'hidden'
        }}>
          <OllamaCompletion model={modelName} />
        </main>
        
        {/* Footer */}
        <footer style={{
          width: '100%',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '14px',
          padding: '20px 0 10px 0',
          animation: 'fadeIn 1s ease-out',
          animationDelay: '0.4s',
          animationFillMode: 'both',
          marginTop: 'auto'
        }}>
          <p>
            Make sure you have Ollama running with <code style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2px 6px', borderRadius: '6px' }}>ollama serve</code> and 
            the model installed with <code style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2px 6px', borderRadius: '6px' }}>ollama pull {modelName}</code>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;