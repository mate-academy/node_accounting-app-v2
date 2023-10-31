'use strict';

const { createServer } = require('./src/createServer');

createServer()
  .listen(3001, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on localhost:3001');
  });
