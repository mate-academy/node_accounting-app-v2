'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.js').getRouterUsers();
const { userServices } = require('./services/users.js');

const expensesRouter = require('./routes/expenses.js').getRouterExpenses();
const { expenseServices } = require('./services/expenses.js');

function createServer() {
  const app = express();

  userServices.newLocaleStorage();
  expenseServices.newLocaleStorage();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
