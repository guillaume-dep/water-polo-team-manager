import react from '@vitejs/plugin-react'
import manifest from './public/manifest.json' with { type: 'json' }
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'water-polo.png'],
      manifest: manifest,
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return ['/auth', '/groups'].some(prefix => url.pathname.startsWith(prefix))
            },
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
})