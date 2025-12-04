import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: '/pig-game/',
  plugins: [vue(), tailwindcss(),],
  resolve: { alias: { '@': '/src' } },
  assetsInclude: ['**/*.svg'],
})
