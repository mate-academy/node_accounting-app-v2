'use strict';

const express = require('express');
const { usersRouter } = require('./Routes/users');
const { expensesRouter } = require('./Routes/expenses');
const usersServices = require('./Services/users');
const expenseServices = require('./Services/expenses');

function createServer() {
  const app = express();

  expenseServices.resetExpense();
  usersServices.resetUser();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
