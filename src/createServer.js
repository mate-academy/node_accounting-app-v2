/* eslint-disable max-len */
'use strict';

const express = require('express');
const cors = require('cors');

const usersRoute = require('./routes/users');
const expennsesRoute = require('./routes/expenses');
const expensesServices = require('./services/expennses');
const usersServices = require('./services/users');

function createServer() {
  const app = express();

  usersServices.reset();
  expensesServices.reset();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRoute.route);
  app.use('/expenses', expennsesRoute.route);

  return app;
}

module.exports = {
  createServer,
};
