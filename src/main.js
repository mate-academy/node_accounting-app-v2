'use strict';

const { createServer } = require('./createServer');
const { PORT } = require('./static/constants');

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:3000');
});
