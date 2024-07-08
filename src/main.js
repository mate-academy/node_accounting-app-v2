'use strict';

const { createServer } = require('./createServer');

const server = createServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on localhost:${PORT}`);
});

module.exports = {
  server,
};
