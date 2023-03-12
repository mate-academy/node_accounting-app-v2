'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/usersRouter');
const { expensesRouter } = require('./routes/expensesRouter');
const { usersServices } = require('./services/usersServices');
const { expensesServices } = require('./services/expensesServices');

function createServer() {
  usersServices.getInitialUsers();
  expensesServices.getInitialExpenses();

  const app = express();

  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
