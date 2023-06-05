'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');
const { removeUsers } = require('./controllers/users');
const { removeExpenses } = require('./controllers/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  removeUsers();
  removeExpenses();

  return app;
}

module.exports = {
  createServer,
};
