'use strict';

const express = require('express');
const app = express();

const { usersRouter } = require('./users/usersRouter');
const { usersService } = require('./users/userService');
const { expensesService } = require('./expenses/expensesService');
const { expensesRouter } = require('./expenses/expensesRouter');

app.use(express.json());

app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

function clearMemory() {
  usersService.clearUsers();
  expensesService.clearExpenses();
}

function createServer() {
  clearMemory();

  return app;
}

module.exports = {
  createServer,
};
