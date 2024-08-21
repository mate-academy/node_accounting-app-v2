'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.route.js');
const { expensesRouter } = require('./routes/expenses.route.js');
const { resetUsers } = require('./services/users.services.js');
const { resetExpenses } = require('./services/expenses.services.js');
const { errorHandler } = require('./middlewares/middleware.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  resetUsers();
  resetExpenses();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use(errorHandler);

  return app;
}

module.exports = {
  createServer,
};
