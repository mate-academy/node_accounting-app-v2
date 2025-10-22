'use strict';

const { buildApp } = require('./app');

const PORT = process.env.PORT || 3000;

buildApp().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
