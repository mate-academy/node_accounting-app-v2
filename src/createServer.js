'use strict';

const express = require('express');
const { userRoute } = require('./routes/userRoute');
const { clearUsers } = require('./services/userServices');
const { clearExpenses } = require('./services/expensesServices');
const { expensesRouter } = require('./routes/expenseRoutes');

const app = express();

function createServer() {
  clearUsers();
  clearExpenses();

  app.use(express.json());
  app.use('/expenses', expensesRouter);
  app.use('/users', userRoute);

  return app;
}

module.exports = {
  createServer,
};
