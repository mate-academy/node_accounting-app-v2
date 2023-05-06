'use strict';

const express = require('express');

const { router: expensesRouter } = require('./routes/expenses');
const { router: usersRouter } = require('./routes/users');

const expenseController = require('./controllers/expenses');
const userController = require('./controllers/users');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  expenseController.reset();
  userController.reset();

  return app;
}

module.exports = {
  createServer,
};
