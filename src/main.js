'use strict';

const { createServer } = require('./createServer');
const PORT = process.env.PORT || 8080;

const server = createServer();

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}/`);
});
