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

  userServices.removeAll();
  expenseServices.removeAll();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
