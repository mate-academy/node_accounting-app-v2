'use strict';

const express = require('express');
const userServise = require('./Services/user');
const expenseServise = require('./Services/expenses');

const userRouter = require('./routes/user.js');
const expensesRouter = require('./routes/expenses.js');

function createServer() {
  const app = express();

  expenseServise.init();
  userServise.init();

  app.use(userRouter);
  app.use(expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
