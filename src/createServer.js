'use strict';

const express = require('express');

const userServise = require('./services/users');
const userRouter = require('./routes/usersRoutes');

const expenseServise = require('./services/expenses');
const expenseRouter = require('./routes/expensesRoutes');

function createServer() {
  const app = express();

  app.use('/expenses', express.json(), expenseRouter);
  expenseServise.init();

  app.use('/users', express.json(), userRouter);
  userServise.init();

  return app;
}

module.exports = {
  createServer,
};
