'use strict';

const express = require('express');
const { clearUsersStorage } = require('./services/users.service.js');
const { clearExpensesStorage } = require('./services/expenses.service.js');
const { router: usersRouter } = require('./routes/users.js');
const { router: expensesRouter } = require('./routes/expenses.js');

function createServer() {
  clearUsersStorage();
  clearExpensesStorage();

  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
