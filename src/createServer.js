'use strict';

const express = require('express');
const cors = require('cors');

const usersService = require('./services/users.js');
const expensesService = require('./services/expenses.js');

const usersRouter = require('./routes/users.js').router;
const expensesRouter = require('./routes/expenses.js').router;

function createServer() {
  usersService.getInitialUsers();
  expensesService.getInitialExpenses();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

// const setver1 = createServer();

// setver1.listen();

module.exports = {
  createServer,
};
