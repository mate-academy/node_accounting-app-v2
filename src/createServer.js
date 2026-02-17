'use strict';

const express = require('express');
const cors = require('cors');
const { createUserRouter } = require('./routes/user.routes');
const { createExpenseService } = require('./services/expenses.service');
const { createUserService } = require('./services/users.service');
const {
  createExpenseControllers,
} = require('./controllers/expenses.controllers');

const { createExpenseRouter } = require('./routes/expenses.routes');

function createServer() {
  const app = express();
  const usersService = createUserService();
  const expensesService = createExpenseService(usersService);
  const expenseControllers = createExpenseControllers(expensesService);
  const UserRouter = createUserRouter(usersService);
  const ExpensesRouter = createExpenseRouter(expenseControllers);

  app.use(cors());
  app.use(express.json());

  app.use('/users', UserRouter);
  app.use('/expenses', ExpensesRouter);

  return app;
}

module.exports = {
  createServer,
};
