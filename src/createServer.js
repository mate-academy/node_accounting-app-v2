'use strict';

const express = require('express');
const { router: userRoutes } = require('./routes/usersRotes.js');
const { router: expensesRoutes } = require('./routes/expensesRoutes.js');
const usersServices = require('./services/usersServices');
const expensesServices = require('./services/expensesServices');

function createServer() {
  usersServices.clear();
  expensesServices.clear();

  const app = express();

  app.use('/users', express.json(), userRoutes);

  app.use('/expenses', express.json(), expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
