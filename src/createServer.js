
'use strict';

const express = require('express');
const { router: expensesRouter } = require('./routes/expenses');
const { router: usersRouter } = require('./routes/users');
const cors = require('cors');

function createServer() {
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
