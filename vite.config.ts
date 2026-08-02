import { defineConfig } from 'vite';

const isNetlifyBuild = process.env.NETLIFY === 'true' || process.env.CONTEXT !== undefined;

export default defineConfig({
  base: isNetlifyBuild ? '/' : '/La-Grange/',
  build: {
    sourcemap: false,
  },
});
