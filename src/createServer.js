'use strict';

const express = require('express');
const cors = require('cors');

const usersServices = require('./services/usersServices');
const { usersRouter } = require('./routes/usersRouter');
const expensesServices = require('./services/expensesServices');
const { expensesRouter } = require('./routes/expensesRouter');

const createServer = () => {
  const app = express();

  app.use(cors());

  usersServices.resetUsers();
  expensesServices.resetExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
