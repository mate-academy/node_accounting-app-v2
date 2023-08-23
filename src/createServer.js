'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/users.js');
const expenseService = require('./services/expenses.js');
const userRouter = require('./routes/userRoutes.js');
const expenseRouter = require('./routes/expenseRoutes.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  userService.clearUsers();
  expenseService.clearExpenses();

  app.use('/users', express.json(), userRouter.router);
  app.use('/expenses', express.json(), expenseRouter.router);

  return app;
}

module.exports = {
  createServer,
};
