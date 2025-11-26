import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 1. Ensure production build output goes into 'build' (CRA's default)
  build: {
    outDir: 'build', 
  },
  // 2. Configure proxy for MERN stack API calls if you were using setupProxy.js
  server: {
    port: 3000, // Keeps the default port 
    proxy: {
      // Example: Proxy all /api requests to your running Express server
      '/api': {
        target: 'http://localhost:8080', // CHANGE TO YOUR BACKEND PORT
        changeOrigin: true,
        secure: false,
      }
    }
  }
});