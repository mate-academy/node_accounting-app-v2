'use strict';

const { createServer } = require('./src/createServer');

const PORT = 3000;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${3000}`);
});
