'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routers/users');
const { router: expensesRouter } = require('./routers/expenses');
const { removeAll: removeExpenses } = require('./services/expenses');
const { removeAll: removeUsers } = require('./services/users');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  removeExpenses();
  removeUsers();

  return app;
}

module.exports = {
  createServer,
};
