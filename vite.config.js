import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ─── Dev Server Proxy ────────────────────────────────────────────────────
  // During local development, `fetch('/api/analyze')` in the browser would
  // 404 because Vite doesn't know about our serverless function.
  // This proxy forwards any /api/* request to the Vercel dev server (port 3000)
  // which DOES know how to run the api/analyze.js serverless function.
  //
  // Usage: run `vercel dev` (instead of `npm run dev`) to start both servers.
  //        Vite starts on :5173, Vercel CLI starts the functions on :3000.
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
