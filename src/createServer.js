'use strict';

const express = require('express');
const { data } = require('./data');
const { expensesRouter } = require('./expenses.controller');
const { usersRouter } = require('./users.controller');

function createServer() {
  const app = express();

  data.users = [];
  data.expenses = [];

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
