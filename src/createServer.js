'use strict';

const express = require('express');
const { usersRouter } = require('./Routes/users');
const { expensesRouter } = require('./Routes/expenses');
const usersServices = require('./Services/users');
const expenseServices = require('./Services/expenses');

function resetData() {
  expenseServices.resetExpense();
  usersServices.resetUser();
}

function configureApp() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

function createServer() {
  resetData();

  return configureApp();
}

module.exports = {
  createServer,
};
