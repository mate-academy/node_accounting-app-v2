'use strict';

const { createServer } = require('./createServer');
const PORT = process.env.PORT || 3000;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:' + PORT);
});
