'use strict';

const express = require('express');
const cors = require('cors');

const { router: UserRouter } = require('./routes/users.js');
const { router: ExpensesRouter } = require('./routes/expenses.js');
const usersService = require('./services/users.js');
const expensesService = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());

  usersService.deleteAll();
  expensesService.deleteAll();

  app.use('/users', express.json(), UserRouter);
  app.use('/expenses', express.json(), ExpensesRouter);

  return app;
}

module.exports = {
  createServer,
};
