'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./api/users.router.js');
const { expensesRouter } = require('./api/expenses.router.js');
const { resetUsers } = require('./services/users.service.js');
const { resetExpenses } = require('./services/expenses.service.js');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  return app;
}

module.exports = {
  createServer,
};
