'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('../src/routes/users.route');
const expensesRouter = require('../src/routes/expenses.route');
const { clearAllUsers } = require('./services/users.service');

const { clearAllExpenses } = require('./services/expenses.service');
const app = express();

function createServer() {
  clearAllExpenses();
  clearAllUsers();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
