'use strict';

const PORT = process.env.PORT || 3000;

const { createServer } = require('./createServer');

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}/`);
});
