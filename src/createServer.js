'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./router/users.js');
const expensesRouter = require('./router/expenses.js');
const expenseServices = require('./services/expensesServices.js');
const userServices = require('./services/usersServices.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  userServices.removeAll();
  expenseServices.removeAll();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
