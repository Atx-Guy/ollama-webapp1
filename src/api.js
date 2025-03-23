const OLLAMA_API_BASE_URL = 'http://localhost:11434/api'; // Or your Ollama API URL

// Function to generate a completion
export const generateCompletion = async (model, prompt, options = {}) => {
    try {
        const response = await axios.post(`${OLLAMA_API_BASE_URL}/generate`, {
            model,
            prompt,
            stream: false, // Get the full response in a single object
            options,
        });
        return response.data.response; // Extract the text from the response
    } catch (error) {
        console.error("Error generating completion:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

// Function to generate a chat completion
export const generateChatCompletion = async (model, messages, options = {}, tools = []) => {
  try {
    const response = await axios.post(`${OLLAMA_API_BASE_URL}/chat`, {
      model,
      messages,
      stream: false,
      options,
      tools
    });
    return response.data.message.content;
  } catch (error) {
    console.error("Error generating chat completion:", error);
    throw error;
  }
};

// Function to list available models
export const listModels = async () => {
    try {
        const response = await axios.get(`${OLLAMA_API_BASE_URL}/tags`);
        return response.data.models;
    } catch (error) {
        console.error("Error listing models:", error);
        throw error;
    }
};

// Function to show model details
export const showModelDetails = async (model) => {
    try {
        const response = await axios.post(`${OLLAMA_API_BASE_URL}/show`, {
            model,
        });
        return response.data;
    } catch (error) {
        console.error("Error showing model details:", error);
        throw error;
    }
};

// Function to generate embeddings
export const generateEmbeddings = async (model, input, options = {}) => {
  try {
    const response = await axios.post(`${OLLAMA_API_BASE_URL}/embed`, {
      model,
      input,
      options
    });
    return response.data.embeddings;
  } catch (error) {
    console.error("Error generating embeddings", error);
    throw error;
  }
};