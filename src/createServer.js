'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');
const { usersService } = require('./services/users.service');
const { expensesService } = require('./services/expenses.service');

function createServer() {
  const app = express();

  usersService.reset(); // Reset the users data before starting the server
  expensesService.reset(); // Reset the expenses data before starting the server

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
