import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'TodoLis',
        short_name: 'TodoLis',
        theme_color: '#3B82F6',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '/',
        icons: []
      }
    })
  ],
})
