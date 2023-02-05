'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const userServices = require('./services/users');
const expenseServices = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  userServices.init();
  expenseServices.init();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
