module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true
  },
  rules: {
    'no-proto': 0,
    'comma-dangle': 0
  },
  plugins: ['jest'],
  overrides: [
    {
      files: ['src/controllers/expense.controller.js'],
      rules: {
        'function-paren-newline': 0
      }
    }
  ]
};
