'use strict';

const express = require('express');
const cors = require('cors');
const expenseServices = require('./services/expenses');
const usersServices = require('./services/users');

const expensesRouter = require('./routes/expenses');
const usersRouter = require('./routes/users');

function createServer() {
  expenseServices.init();
  usersServices.init();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
