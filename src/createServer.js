'use strict';

const express = require('express');
const UserService = require('./services/userService');
const ExpenseService = require('./services/expenseService');
const UserController = require('./controllers/userController');
const ExpenseController = require('./controllers/expenseController');
const { createUserRoutes } = require('./routes/userRoutes');
const { createExpenseRoutes } = require('./routes/expenseRoutes');

function createServer() {
  const app = express();

  app.use(express.json());

  // Data stores
  const users = [];
  const expenses = [];

  // Services
  const userService = new UserService(users);
  const expenseService = new ExpenseService(expenses);

  // Controllers
  const userController = new UserController(userService);
  const expenseController = new ExpenseController(expenseService, userService);

  // Routes
  const userRoutes = createUserRoutes(userController);
  const expenseRoutes = createExpenseRoutes(expenseController);

  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  return app;
}

module.exports = {
  createServer,
};
