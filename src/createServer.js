import express from 'express';
import cors from 'cors';
import router from './routes/routes';

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', router);
  app.use('/expenses', router);

  return app;
}

createServer()
  .listen(3000, () => {
  // eslint-disable-next-line no-console
    console.log('Server is running on localhost:3000');
  });

module.exports = createServer;
