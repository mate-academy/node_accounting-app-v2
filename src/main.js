import { createServer } from './createServer.js';

const app = createServer();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server was started!');
});
