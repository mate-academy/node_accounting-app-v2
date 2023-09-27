'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
