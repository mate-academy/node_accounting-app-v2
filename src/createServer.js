'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const userServices = require('./services/users');
const expensesServices = require('./services/expenses');

const createServer = () => {
  const app = express();

  userServices.init();
  expensesServices.init();

  app.use('/users', express.json(), usersRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
