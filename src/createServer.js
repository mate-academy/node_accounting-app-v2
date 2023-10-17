'use strict';

const express = require('express');
const { usersRouter } = require('./routers/usersRouter');
const { expensesRouter } = require('./routers/expensesRouter');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
