'use strict';

const express = require('express');
const cors = require('cors');
const { UserServices } = require('./services/users.service');
const { ExpenseServises } = require('./services/expenses.service');
const { UserRouter } = require('./routers/user.router');
const { ExpensesRouter } = require('./routers/expenses.router');

function createServer() {
  const app = express();

  UserServices.clearUsers();
  ExpenseServises.clearExpenses();

  app.use(cors());

  app.use('/users', express.json(), UserRouter);

  app.use('/expenses', express.json(), ExpensesRouter);

  return app;
}

module.exports = {
  createServer,
};
