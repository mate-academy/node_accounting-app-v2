/* eslint-disable max-len */
'use strict';

const express = require('express');
const { usersRouter } = require('./routers/users.router');
const { expenseRouter } = require('./routers/expenses.router.js');
const { initUsers } = require('./services/users.service');
const { intitExpenses } = require('./services/expenses.service');

const createServer = () => {
  const app = express();

  initUsers();
  intitExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

createServer();

module.exports = {
  createServer,
};
