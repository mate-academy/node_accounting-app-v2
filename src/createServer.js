'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.router');
const { expensesRouter } = require('./routes/expenses.router');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
