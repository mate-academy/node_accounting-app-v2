'use strict';

const express = require('express');
const { usersRouter } = require('./routes/userRoutes');
const { expensesRouter } = require('./routes/expenseRoutes');
const usersServices = require('./services/userServices');
const expenseServices = require('./services/expenseServices');

function createServer() {
  const app = express();

  expenseServices.resetExpenses();
  usersServices.resetUsers();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
