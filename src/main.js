'use strict';

const { createServer } = require('./createServer');
const { PORT } = require('./config');

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
