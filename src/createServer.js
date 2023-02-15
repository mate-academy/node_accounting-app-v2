'use strict';

const express = require('express');
const cors = require('cors');

const usersServices = require('./services/users');
const expensesServices = require('./services/expenses');

const usersRouter = require('./routes/users').router;
const expensesRouter = require('./routes/expenses').router;

function createServer() {
  const app = express();

  app.use(cors());

  usersServices.setInitialValue();
  expensesServices.setInitialValue();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
