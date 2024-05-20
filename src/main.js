'use strict';

const { port } = require('./consts');
const { createServer } = require('./createServer');

createServer().listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on localhost:${port}`);
});
