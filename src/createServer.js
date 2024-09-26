'use strict';

const express = require('express');
const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');
const userServices = require('./services/users.js');
const expensesServices = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  userServices.reset();
  expensesServices.reset();

  return app;
}

module.exports = {
  createServer,
};
