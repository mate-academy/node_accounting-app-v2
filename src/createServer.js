'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');
const { setInitUsers } = require('./services/users.service');
const { setInitExpanses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  setInitUsers();
  setInitExpanses();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
