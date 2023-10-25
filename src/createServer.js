/* eslint-disable no-console */
'use strict';

const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const { expenseServices } = require('./services/expensesServices');
const { userServices } = require('./services/userServices');

function createServer() {
  const app = express();

  expenseServices.clear();
  userServices.clear();

  app.use('/users', express.json(), usersRoutes);
  app.use('/expenses', express.json(), expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
