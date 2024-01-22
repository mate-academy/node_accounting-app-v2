'use strict';

const express = require('express');
const { expensesRouter } = require('./routes/exspensesRouter');
const { userRouter } = require('./routes/users.router');
const { resetExpenses } = require('./services/expensesService');
const { resetUser } = require('./services/usersService');
const app = express();

function createServer() {
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
