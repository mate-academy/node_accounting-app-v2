'use strict';

const express = require('express');
const cors = require('cors');
const { resetUsers } = require('./services/users.js');
const { resetExpenses } = require('./services/expenses.js');
const { expensesRouter } = require('./routes/expenses.js');

const { usersRouter } = require('./routes/users.js');

function createServer() {
  resetUsers();
  resetExpenses();

  const app = express();

  app.use(cors());
  app.use('/users', express.json({ extended: true }), usersRouter);
  app.use('/expenses', express.json({ extended: true }), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
