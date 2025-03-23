import React from 'react';
import OllamaCompletion from './OllamaCompletion'; // Import the component

const App = () => {
  const modelName = "llama2"; // Or any model you want to use.

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Ollama App</h1>
      </header>
      <main>
        <OllamaCompletion model={modelName} /> {/* Use the component */}
      </main>
    </div>
  );
};

export default App;
