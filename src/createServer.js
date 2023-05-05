'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses.js');
const { expensesService } = require('./services/expenses.js');
const { usersService } = require('./services/users.js');

function createServer() {
  const app = express();

  expensesService.resetData();
  usersService.resetData();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
