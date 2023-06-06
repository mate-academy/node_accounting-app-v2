'use strict';

const express = require('express');
const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
