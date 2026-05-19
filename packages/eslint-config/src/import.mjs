import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

export const importConfig = defineConfig([
  importPlugin.flatConfigs.recommended,
  // import 的一些不兼容规则
  {
    rules: {
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
    },
  },
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@/**',
              position: 'after',
              group: 'internal',
            },
            {
              pattern: '@heathen/**',
              position: 'after',
              group: 'external',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },
]);
