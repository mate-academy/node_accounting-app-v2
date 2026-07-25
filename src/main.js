'use strict';

const { createServer } = require('./createServer');

createServer().listen(7000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:7000');
});
