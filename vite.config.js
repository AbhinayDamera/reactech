import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js ecosystem — large but cacheable
          if (id.includes('node_modules/three') ||
              id.includes('node_modules/@react-three')) {
            return 'three-vendor'
          }
          // MediaPipe — large WASM-backed library
          if (id.includes('node_modules/@mediapipe')) {
            return 'mediapipe'
          }
          // Daily.co video SDK
          if (id.includes('node_modules/@daily-co')) {
            return 'daily-vendor'
          }
          // React core
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/scheduler')) {
            return 'react-vendor'
          }
        },
      },
    },
    // Three.js is inherently large; suppress the warning for it
    chunkSizeWarningLimit: 1200,
  },
})
