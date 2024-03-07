module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    mocha: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  globals: {
    expect: 'readonly',
  },
  rules: {
    'no-proto': 0
  },
  plugins: ['jest']
};
