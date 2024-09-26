'use strict';

const express = require('express');
const { router: usersRouter } = require('./routers/usersRouter');
const { router: expensesRouter } = require('./routers/expensesRouters');
const expensesController = require('./controllers/expensesController');
const usersController = require('./controllers/usersController');

function createServer() {
  const app = express();

  usersController.reset();
  expensesController.reset();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
