import { defineConfig } from 'astro/config';
import remarkPoemBreak from './src/remark/remark-poem-break.js';

export default defineConfig({
  site: 'https://nero-dg.github.io',
  base: '/Noir-Digi',
  markdown: {
    remarkPlugins: [remarkPoemBreak],
  },
});
