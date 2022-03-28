module.exports = {
  root: true,
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    impliedStrict: true,
    ecmaFeatures: {
      legacyDecorators: true,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'windows'],
    'import/no-anonymous-default-export': [2, { allowObject: true }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
