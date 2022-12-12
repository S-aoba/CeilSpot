import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // npm run devした時に自動的にサーバーが立ち上がるようにする
    open: true,
    // デフォルトのポート番号の変更
    // port: 3000,
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'prismjs',
            {
              languages: ['javascript', 'css', 'html', 'json', 'typescript', 'python'],
              plugins: ['line-highlight', 'line-numbers', 'show-language'],
              theme: 'okaidia',
              css: true,
            },
          ],
        ],
      },
    }),
  ],
})
