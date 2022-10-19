module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    mocha: true,
  },
  globals: {
    expect: 'readonly',
  },
  rules: {
    'no-proto': 0
  },
  plugins: ['jest']
};
