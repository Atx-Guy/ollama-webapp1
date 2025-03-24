import React, { useState } from 'react';
import axios from 'axios';

const ApiTestComponent = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testDirectApi = async () => {
    setLoading(true);
    setError(null);
    setResult('');

    try {
      console.log('Testing direct API call to Ollama...');
      
      // Try with proper CORS headers
      const response = await axios.post('http://127.0.0.1:11434/api/generate', {
        model: 'llama2:latest',
        prompt: 'Hello, who are you?',
        stream: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Raw API response:', response);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('API Test Error:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>API Test Tool</h3>
      <button onClick={testDirectApi} disabled={loading}>
        {loading ? 'Testing...' : 'Test Direct API Call'}
      </button>
      
      {error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && (
        <div style={{ marginTop: '10px' }}>
          <h4>API Response</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTestComponent;