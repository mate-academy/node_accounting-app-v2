'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routers/users');
const expensesRouter = require('./routers/expenses');
const { removeAllExpenses } = require('./services/expenses');
const { removeAllUsers } = require('./services/users');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  removeAllExpenses();
  removeAllUsers();

  return app;
}

module.exports = {
  createServer,
};
