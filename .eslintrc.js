module.exports = {
  parser: '@typescript-eslint/parser', // використовуємо парсер для TypeScript
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    jest: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'jest'], // додаємо TypeScript плагін
  extends: [
    '@mate-academy/eslint-config', // твоя базова конфігурація
    // 'plugin:@typescript-eslint/recommended', // правила для TS
    'prettier', // інтеграція з Prettier
  ],
  rules: {
    'no-proto': 0,
    // тут можна додати свої правила або перезаписати
  },
};
