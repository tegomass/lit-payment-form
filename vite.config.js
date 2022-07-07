import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/lit-payment-form.js',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  },
  server: {
    port: 3002,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['lcov'], //https://github.com/bcoe/c8/issues/71
      // exclude: [
      //   'node_modules/',
      //   'src/setupTests.ts',
      // ],
    },
  },

})
