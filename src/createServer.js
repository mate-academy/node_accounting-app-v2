'use strict';

const express = require('express');
const Users = require('./service/usersService');
const Expenses = require('./service/expensesService');
const createUserRouter = require('./routers/userRoutes');
const createExpRouter = require('./routers/expenseRoutes');

function createServer() {
  const app = express();
  const usersService = new Users();
  const expService = new Expenses();
  const userRouter = createUserRouter(usersService);
  const expensesRouter = createExpRouter(expService, usersService);

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
