import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  base: '/paike2/',
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          // react-dev-locator 仅在开发模式下启用，避免生产构建注入 trae-inspector-* 属性
          ...(mode === 'development' ? ['react-dev-locator'] : []),
        ],
      },
    }),
    tsconfigPaths()
  ],
}))
