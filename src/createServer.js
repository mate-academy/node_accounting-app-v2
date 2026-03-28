'use strict';

const express = require('express');
const { createUserRouter } = require('./routes/user.routes');
const { createExpenseRouter } = require('./routes/expense.routes');

function createServer() {
  const app = express();

  const store = {
    users: [],
    expenses: [],
    nextUserId: 1,
    nextExpensesId: 1,
  };

  app.use(express.json());
  app.use('/users', createUserRouter(store));
  app.use('/expenses', createExpenseRouter(store));

  return app;
}

module.exports = {
  createServer,
};
