import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export const prettierConfig = defineConfig([
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          trailingComma: 'all',
          semi: true,
          singleQuote: true,
          printWidth: 120,
          arrowParens: 'always',
          jsxSingleQuote: true,
        },
      ],
    },
  },
]);
