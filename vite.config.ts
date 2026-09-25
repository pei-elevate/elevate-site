import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works on any GitHub Pages path
// (https://<org>.github.io/<repo>/). HashRouter handles the routes.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
