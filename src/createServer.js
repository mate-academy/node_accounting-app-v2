'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./users.routes');
const { router: expensesRouter } = require('./expenses.routes');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
