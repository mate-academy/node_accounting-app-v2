'use strict';

const express = require('express');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const { resetStore } = require('./data/store');

function createServer() {
  const app = express();

  app.use(express.json());

  resetStore();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
