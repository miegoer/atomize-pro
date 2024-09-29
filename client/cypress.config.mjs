import { defineConfig } from 'cypress';
import webpackPreprocessor from '@cypress/webpack-preprocessor';

export default defineConfig({
  e2e: {
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});