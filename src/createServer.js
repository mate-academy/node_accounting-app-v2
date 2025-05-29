'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routers/users');
const expensesRouter = require('./routers/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
