'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');
const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const server = express();

  server.use(cors());
  server.use(express.json());

  usersService.deleteAllUsers();
  expensesService.deleteAllExpenses();

  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
