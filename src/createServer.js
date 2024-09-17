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

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
