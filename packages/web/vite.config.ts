import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { compression } from 'vite-plugin-compression2'

const libs = [
  'antd',
  '@ant-design/icons',
  'axios',
  'react-dnd',
  'react-router-dom',
].reduce(
  (libs, name) => {
    const key = `/node_modules/${name}`
    libs[key] = name
    return libs
  },
  {} as Record<string, string>,
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    compression({
      deleteOriginalAssets: true,
      exclude: [/\.(jpg|jpeg|png|gif|svg|webp)$/, /\.html$/],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api/user': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/exam': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/answer': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/analyse': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: (id) => {
          const key = Object.keys(libs).find((k) => id.includes(k)) || ''
          if (key in libs) {
            return libs[key]
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
