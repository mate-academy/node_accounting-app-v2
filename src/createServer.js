'use strict';

const express = require('express');
const userRouter = require('./routes/usersRouter').userRouter;
const expenseRouter = require('./routes/expensesRouter').expenseRouter;
const { clearUsers } = require('./services/usersServices');
const { clearExpenses } = require('./services/expencesServices');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
