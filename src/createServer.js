'use strict';

const express = require('express');
const usersRouter = require('./routes/user.routes');
const expenseRouter = require('./routes/expense.routes');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter.router);

  app.use('/expenses', express.json(), expenseRouter.router);

  return app;
}

module.exports = {
  createServer,
};
