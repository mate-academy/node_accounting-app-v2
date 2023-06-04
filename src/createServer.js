'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const userServices = require('./services/users');
const expensesServices = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  userServices.reset();
  expensesServices.reset();

  return app;
}

module.exports = {
  createServer,
};
