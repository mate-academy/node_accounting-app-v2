'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses.js');
const expensesService = require('./services/expenses.js');
const usersService = require('./services/users.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  expensesService.reset();
  usersService.reset();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
