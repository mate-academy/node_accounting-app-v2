'use strict';

const express = require('express');
const cors = require('cors');

const { setInitialUsers } = require('./services/users');
const { setInitialExpenses } = require('./services/expenses');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  setInitialUsers([]);
  setInitialExpenses([]);

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
