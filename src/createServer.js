'use strict';

const express = require('express');
const cors = require('cors');

const userServices = require('./services/users');
const expenseServices = require('./services/expenses');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use('/users', usersRouter);

  userServices.initUsers();

  app.use('/expenses', expensesRouter);

  expenseServices.initExpenses();

  return app;
}

module.exports = {
  createServer,
};
