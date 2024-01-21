'use strict';

const { createServer } = require('./src/createServer');

createServer()
  .listen(3000, () => {
    console.log('Server is running on localhost:3000');
  });
