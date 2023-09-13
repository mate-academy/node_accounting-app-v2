'use strict';

const express = require('express');
const cors = require('cors');
const usersService = require('./services/users.js');
const expensesService = require('./services/expenses.js');
const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');

function createServer() {
  usersService.resetUsers();
  expensesService.resetExpenses();

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
