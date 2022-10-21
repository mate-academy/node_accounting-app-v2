'use strict';

const { usersArray } = require('./controllers/users');
const { expensesArray } = require('./controllers/expenses');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

const express = require('express');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);

  usersArray();

  app.use('/expenses', express.json(), expensesRouter);

  expensesArray();

  return app;
}

module.exports = {
  createServer,
};
