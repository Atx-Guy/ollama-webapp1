import axios from 'axios';

// Function to generate a completion
export const generateCompletion = async (model = 'llama2:latest', prompt) => {
  try {
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
      model,
      prompt,
      stream: false // Disable streaming to get the full response at once
    });
    
    // Based on our test, we can see Ollama returns { response: "text" }
    if (response.data && typeof response.data === 'object') {
      // Modern Ollama versions return response in this format
      if (response.data.response) {
        return response.data.response;
      } 
      // Fallbacks for other potential formats
      else if (response.data.text) {
        return response.data.text;
      }
      // If response is the entire object, stringify it
      else {
        console.log('Response data:', response.data);
        return JSON.stringify(response.data);
      }
    }
    
    // If response is plain text
    return response.data;
  } catch (error) {
    console.error('Error calling Ollama API:', error);
    throw error;
  }
};

// Function to list available models
export const listModels = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:11434/api/tags');
    return response.data.models;
  } catch (error) {
    console.error('Error listing models:', error);
    throw error;
  }
};

// Function to check if Ollama server is running
export const checkServerStatus = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:11434/api/version');
    return { connected: true, version: response.data.version };
  } catch (error) {
    return { connected: false, error };
  }
};