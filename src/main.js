'use strict';
import { createServer } from './createServer.js';

const PORT = 3000;

const app = createServer();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
