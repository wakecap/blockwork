import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'fontawesome': [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/pro-solid-svg-icons',
            '@fortawesome/pro-light-svg-icons',
            '@fortawesome/pro-duotone-svg-icons',
            '@fortawesome/react-fontawesome'
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@fortawesome/pro-solid-svg-icons', '@fortawesome/pro-light-svg-icons', '@fortawesome/pro-duotone-svg-icons'],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
}) 