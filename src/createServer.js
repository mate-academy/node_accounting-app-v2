'use strict';

const express = require('express');
const { userRouter } = require('./routes/usersRoute');
const { clearAllUsers } = require('./services/usersService');
const { expensesRouter } = require('./routes/expensesRouter');
const { clearExpenses } = require('./services/expensesService');

function createServer() {
  const app = express();

  clearAllUsers();
  clearExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
