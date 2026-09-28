'use strict';

const express = require('express');
const { usersRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expense.route');
const { usersService } = require('./services/user.service');
const { expensesService } = require('./services/expense.service');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.post('/reset', (req, res) => {
    if (typeof usersService.resetUsers === 'function') {
      usersService.resetUsers();
    } else if (typeof usersService.reset === 'function') {
      usersService.reset();
    }

    if (typeof expensesService.resetExpenses === 'function') {
      expensesService.resetExpenses();
    } else if (typeof expensesService.reset === 'function') {
      expensesService.reset();
    }

    res.sendStatus(200);
  });

  return app;
}

module.exports = {
  createServer,
  usersService,
  expensesService,
};
