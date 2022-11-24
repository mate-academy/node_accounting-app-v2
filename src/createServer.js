'use strict';

const express = require('express');
const { expensesRouter } = require('./routers/expensesRouter');
const { usersRouter } = require('./routers/usersRouter');
const { expenseServices } = require('./services/expenses_services');
const { userServices } = require('./services/users_services');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  userServices.init();
  expenseServices.init();

  return app;
}

module.exports = {
  createServer,
};
