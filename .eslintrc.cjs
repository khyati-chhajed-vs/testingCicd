module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [0],
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'snake_case', 'PascalCase'],
      },
    ],
    '@typescript-eslint/return-await': 'off',
  },
};
