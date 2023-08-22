'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/usersRouter');
const { expensesRouter } = require('./routes/expensesRouter');
const { userService } = require('./services/userService');
const { expensesService } = require('./services/expensesService');

function createServer() {
  const app = express()
    .use(express.json())
    .use(cors());

  expensesService.clearExpenses();
  userService.clearUsers();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
