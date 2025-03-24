import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  esbuild: {
    jsx: 'automatic', // or 'transform' if you are not using react 17+
  },
  plugins: [react()],
});
