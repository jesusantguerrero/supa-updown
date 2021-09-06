import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from "vite-svg-loader"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  optimizeDeps: {
    include: ['atmosphere-ui'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components/atoms'),
      '@core': path.resolve(__dirname, 'src/components/core'),
      '@lumiere': path.resolve(__dirname, 'src/utils/lumiere'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  }
})
