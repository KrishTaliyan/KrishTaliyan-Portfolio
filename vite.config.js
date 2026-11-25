import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://krishtaliyan.github.io/KrishTaliyan-Portfolio/
// so every asset URL must be prefixed with the repository name.
export default defineConfig({
  plugins: [react()],
  base: '/KrishTaliyan-Portfolio/',
})
