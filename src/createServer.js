'use strict';

const express = require('express');

const { createUsersRouter } = require('./routes/usersRouter');
const { createExpensesRouter } = require('./routes/expensesRouter');

function createServer() {
  const app = express();

  app.use(express.json());

  const state = {
    users: [],
    expenses: [],
    nextUserId: 1,
    nextExpenseId: 1,
  };

  app.use('/users', createUsersRouter(state));
  app.use('/expenses', createExpensesRouter(state));

  return app;
}

module.exports = {
  createServer,
};
