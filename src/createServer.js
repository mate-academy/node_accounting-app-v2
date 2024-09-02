'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/usersRoutes.js');
const { router: expensesRouter } = require('./routes/expensesRoutes.js');
const userServices = require('./services/usersServices.js');
const expensesService = require('./services/expensesServices.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);

  app.use('/expenses', expensesRouter);

  userServices.reset();
  expensesService.reset();

  return app;
}

module.exports = {
  createServer,
};
