'use strict';

const express = require('express');
const { initUserRouter } = require('./routes/userRouter.js');
const { initExpenseRouter } = require('./routes/expenseRouter');

function createServer() {
  const app = express();

  app.use(express.json());

  const userRouter = express.Router();
  const expenseRouter = express.Router();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  initUserRouter(userRouter);
  initExpenseRouter(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
