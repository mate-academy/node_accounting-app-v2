'use strict';

const { createServer } = require('./createServer');

const PORT = 3000;

createServer().listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on localhost:${PORT}`);
});
