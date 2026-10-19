import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` -> dist/index.html: one self-contained file (code, styles and photos embedded).
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { assetsInlineLimit: 100_000_000 },
})
