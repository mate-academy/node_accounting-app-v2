/* eslint-disable no-console */
'use strict';

const { createServer } = require('./src/createServer');

const PORT = process.env.PORT || 3001;

createServer().listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
