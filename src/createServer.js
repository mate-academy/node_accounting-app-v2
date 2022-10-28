/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { router as usersRouter } from './routes/usersRoutes.js';
import { router as expencesRouter } from './routes/expensesRoutes.js';

export function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expencesRouter);

  app.get('/', (req, res) => {
    res.sendStatus(404);
  });

  return app;
}
