'use strict';

const { usersRouter } = require('./routers/users');
const { expensesRouter } = require('./routers/expenses');
const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
