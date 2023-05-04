'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter');
const expensesRouter = require('./routes/expensesRouter');
const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');

function createServer() {
  usersService.getInitial();
  expensesService.getInitial();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
