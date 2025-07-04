const { createServer } = require('./createServer');

const app = createServer();

app.listen(5700, () => {});
