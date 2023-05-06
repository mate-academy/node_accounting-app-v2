'use strict';

const express = require('express');

function createServer() {
  const cors = require('cors');
  const { userService } = require('./services/users.js');
  const { expensesService } = require('./services/expenses.js');
  const { router: usersRouter } = require('./routes/users.js');
  const { router: expensesRouter } = require('./routes/expenses.js');

  userService.reset();
  expensesService.reset();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
