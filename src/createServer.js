'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/userRoutes');
const expensesRouter = require('./routes/expensesRoutes');
const userService = require('./services/userService');
const expenseService = require('./services/expensesService');

function createServer() {
  const app = express();

  userService.clearAll();
  expenseService.clearAll();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
