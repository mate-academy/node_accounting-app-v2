'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/usersRouter');
const { router: expensesRouter } = require('./routes/expensesRouter');

const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');

function createServer() {
  usersService.init();
  expensesService.init();

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
