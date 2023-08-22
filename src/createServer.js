'use strict';

const cors = require('cors');
const express = require('express');

const userServices = require('./services/users.js');
const expensesServices = require('./services/expenses.js');
const { usersRouter } = require('./routes/usersRouter.js');
const { expensesRouter } = require('./routes/expensesRouter.js');

function createServer() {
  const app = express();

  expensesServices.removeAll();
  userServices.removeAll();

  app.use(cors());
  app.use(express.json());

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
