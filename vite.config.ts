import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true,
  },
  resolve: {
    alias: {
      src: path.resolve('src/'),
    },
  },
});
