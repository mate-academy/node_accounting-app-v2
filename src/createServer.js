'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./rotes/users');
const { router: expensesRouter } = require('./rotes/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
