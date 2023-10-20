'use strict';

const { createServer } = require('./src/createServer');
const { PORT } = require('./src/utils/constants');

const server = createServer();

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:3000');
});
