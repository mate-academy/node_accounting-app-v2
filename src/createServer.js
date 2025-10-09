'use strict';

const express = require('express');

const usersRouter = require('.//routers/users');
const expensesRouter = require('./routers/expenses');
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
