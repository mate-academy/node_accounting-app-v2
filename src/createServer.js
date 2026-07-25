'use strict';

const express = require('express');
const createUserRouter = require('./routes/users.router');
const createExpenseRouter = require('./routes/expenses.router');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  app.use('/users', createUserRouter(users, expenses));
  app.use('/expenses', createExpenseRouter(users, expenses));

  return app;
}

module.exports = {
  createServer,
};
