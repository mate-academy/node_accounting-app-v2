'use strict';

const express = require('express');
const { expenses } = require('./models/expenses');
const { users } = require('./models/users');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function resetStore(store) {
  Object.keys(store).forEach((key) => {
    delete store[key];
  });
}

function createServer() {
  const app = express();

  resetStore(users);
  resetStore(expenses);

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
