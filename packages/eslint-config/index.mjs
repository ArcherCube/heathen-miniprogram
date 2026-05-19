// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import { importConfig } from './src/import.mjs';
import { prettierConfig } from './src/prettier.mjs';
import { reactConfigs } from './src/react.mjs';
import { rulesConfig } from './src/rules.mjs';

export const config = defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  importConfig,
  prettierConfig,
  reactConfigs,
  rulesConfig,
);
