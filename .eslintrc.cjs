module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'react-refresh', 'prettier', 'import', 'prefer-arrow'],
  rules: {
    'prettier/prettier': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "sibling",
          "parent",
          "index",
          "type"
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        "newlines-between": "always"
      }
    ],
    "padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "*", next: ["return", "throw"] },
      { blankLine: "always", prev: "*", next: ["block-like", "class"] },
      { blankLine: "always", prev: ["block-like", "class"], next: "*" },
      { blankLine: "any", prev: "*", next: ["case", "default"] },
      { blankLine: "always", prev: ["var", "let", "const"], next: "*" },
      {
        blankLine: "any",
        prev: ["var", "let", "const"],
        next: ["var", "let", "const"]
      }
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
}
