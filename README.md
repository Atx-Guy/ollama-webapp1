# Ollama Web App

A web interface for interacting with Ollama.

## Prerequisites

1. Install [Ollama](https://ollama.ai)
2. Pull a model: `ollama pull llama2`
3. Make sure Ollama is running: `ollama serve`

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5174 in your browser

## Troubleshooting

- Make sure Ollama is running (`ollama serve`)
- Check that port 11434 is accessible
- Verify you have pulled the model you want to use (`ollama pull llama2`)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
