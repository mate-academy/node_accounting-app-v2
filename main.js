'use strict';

const { createServer } = require('./src/createServer');

const port = 4000;

createServer()
  .listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
  });
