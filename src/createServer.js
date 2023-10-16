'use strict';

const userServices = require('../src/sevices/users.service');
const userRouter = require('../src/routes/user.routes');
const expensesRouter = require('../src/routes/expenses.routes');
const expensesServises = require('../src/sevices/expenses.service');

const express = require('express');
const PORT = 5000;

function createServer() {
  const app = express();

  userServices.clear();
  expensesServises.clear();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};

const server = createServer();

server.listen(PORT, () => { });
