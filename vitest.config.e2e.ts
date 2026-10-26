import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      '#src': resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts']
  }
})
