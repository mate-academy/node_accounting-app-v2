'use strict';

const express = require('express');

const {
  usersRouter,
} = require('./routers/userRouter');

const { setInitialUsers } = require('./services/usersService');
const { setInitialExpenses } = require('./services/expensesService');

const {
  expensesRouter,
} = require('./routers/expenseRouter');

function createServer() {
  setInitialUsers();
  setInitialExpenses();

  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
