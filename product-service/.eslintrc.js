module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'jest', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    'tsdoc/syntax': 'warn',
    'prettier/prettier': 'error',
    'import/order': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'variableLike', format: ['camelCase'] },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
      { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
    ],
    'dot-notation': 'error',
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-var-requires': 0,
  },
  ignorePatterns: ['*.js', '*.d.ts'],
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 0,
      },
    },
  ],
};
