module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:node/recommended', 'standard'],
  plugins: ['node'],
  parserOptions: {
    ecmaVersion: 8
  },
  env: { browser: true },
  globals: {},
  rules: {
    'no-console': 'off',
    semi: ['error', 'never']
  }
}
