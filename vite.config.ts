import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Maps your Vercel GEMINI_KEY to the process.env.API_KEY expected by the code
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.GEMINI_KEY),
      // Prevents "process is not defined" crashes in the browser
      'process.env': JSON.stringify({}),
    },
  };
});