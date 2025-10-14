'use strict';

const { createServer } = require('./createServer');
const app = createServer();

const PORT = 3005;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
