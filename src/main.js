'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createServer } = require('./createServer');

createServer().listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:3000');
});
