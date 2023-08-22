'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expenses');
const { usersRouter } = require('./routes/users');
const expensesServices = require('./services/expenses');
const userServices = require('./services/users');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  expensesServices.removeAll();
  userServices.removeAll();

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
