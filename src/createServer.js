'use strict';

const express = require('express');
const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

const expensesWithUserController = require('./controller/expensesWithUser');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRouter.router);
  app.use('/expenses', express.json(), expensesRouter.router);

  app.post('/expenses', express.json(), expensesWithUserController.add);

  return app;
}

module.exports = {
  createServer,
};
