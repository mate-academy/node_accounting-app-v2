/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */
'use strict';

const express = require('express');

const usersService = require('./servises/users.js');
const { router: usersRouter } = require('./routes/users.js');

const expensesService = require('./servises/expenses.js');
const { router: expensesRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  usersService.removeAll();
  expensesService.removeAll();

  return app;
}

module.exports = {
  createServer,
};
