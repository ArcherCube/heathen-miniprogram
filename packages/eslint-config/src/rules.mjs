import { defineConfig } from 'eslint/config';

export const rulesConfig = defineConfig([
  {
    rules: {
      'default-case': 'off',
      'no-dupe-class-members': 'off',
      'no-undef': 'off',
      '@typescript-eslint/consistent-type-assertions': 'warn',
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'warn',
      'no-use-before-define': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'no-async-promise-executor': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'no-unsafe-optional-chaining': 'off',
      '@typescript-eslint/no-use-before-define': [
        'warn',
        {
          functions: false,
          classes: false,
          variables: false,
          typedefs: false,
        },
      ],
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          allow: ['_'],
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-restricted-globals': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]);
