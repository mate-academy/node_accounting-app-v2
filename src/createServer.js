import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const { expensesRouter } = require('./components/routes/expenses.routes');
const { usersRouter } = require('./components/routes/users.routes');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(usersRouter);
  app.use(expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
