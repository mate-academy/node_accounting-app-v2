'use strict';

const express = require('express');
const userRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');

function createServer() {
  const server = express();

  // Глобальный middleware для парсинга JSON
  server.use(express.json());

  // Роуты
  server.use('/users', userRouter.router);
  server.use('/expenses', expensesRouter.router);

  return server;
}

module.exports = {
  createServer,
};
