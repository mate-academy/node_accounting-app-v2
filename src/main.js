'use strict';

const { createServer } = require('./createServer');
const DEFAULT_PORT = 3000;

const PORT = process.env.PORT || DEFAULT_PORT;

createServer().listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
