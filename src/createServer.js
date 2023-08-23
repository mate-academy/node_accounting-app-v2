'use strict';

const express = require('express');
const cors = require('cors');
const expensesRouter = require('./routers/expenses');
const usersRouter = require('./routers/users');
const { clearExpenses } = require('./controllers/expenses');
const { clearUsers } = require('./controllers/users');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
