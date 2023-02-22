'use strict';

const { userRouter } = require('./routes/usersRoutes');
const { expenseRouter } = require('./routes/expensesRoutes');
const { initialUser } = require('./controllers/users');
const { initialExpenses } = require('./controllers/expenses');

const express = require('express');

function createServer() {
  const app = express();

  initialUser();

  initialExpenses();

  app.use(userRouter);

  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
