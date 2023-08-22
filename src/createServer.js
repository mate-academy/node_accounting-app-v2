
'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');
const usersService = require('./services/users.js');
const expensesService = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());

  expensesService.removeAll();
  usersService.removeAll();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
