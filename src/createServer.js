'use strict';

const express = require('express');
const { expensesRouter } = require('./routes/expenseRoutes');
const { userRouter } = require('./routes/usersRoutes');
const { resetExpenses } = require('./services/expenseService');
const { resetUser } = require('./services/usersService');

function createServer() {
  const app = express();

  resetUser();
  resetExpenses();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
