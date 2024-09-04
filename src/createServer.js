'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter, expensesRouter } = require('./routes');
const { UserService, ExpensesService } = require('./services');

function createServer() {
  const app = express();

  UserService.clearCollection();
  ExpensesService.clearCollection();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
