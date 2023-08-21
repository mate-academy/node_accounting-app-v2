'use strict';

const { createServer } = require('./src/createServer');

const PORT = process.env.PORT || 3001;

createServer()
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
  });
