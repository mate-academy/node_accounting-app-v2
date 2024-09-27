'use strict';

const cors = require('cors');
const express = require('express');
const { router: usersRouter } = require('./routers/UsersRouter');
const { router: expensesRouter } = require('./routers/ExpensesRouter');

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
