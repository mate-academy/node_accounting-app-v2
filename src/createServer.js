'use strict';

const express = require('express');
const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.locals.users = [];
  app.locals.expenses = [];
  app.locals.nextExpenseId = 1;
  app.locals.nextUserId = 1;
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
