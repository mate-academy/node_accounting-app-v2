'use strict';

module.exports = {
  extends: ['@mate-academy/eslint-config', 'plugin:prettier/recommended'],

  env: {
    mocha: true,
  },
  globals: {
    expect: 'readonly',
  },
  rules: {
    'no-proto': 0,
    'prettier/prettier': 'error',
  },
  plugins: ['jest', 'prettier'],
};
