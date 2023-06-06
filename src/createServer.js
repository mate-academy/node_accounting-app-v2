'use strict';

const express = require('express');
const cors = require('cors');
const userServices = require('./services/users.js');
const expensesServices = require('./services/expenses.js');

const usersRouter = require('./routers/users.js');
const expensesRouter = require('./routers/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  userServices.reset();
  expensesServices.reset();

  /* ---------------------------------------------- */

  return app;
}

module.exports = {
  createServer,
};
