'use strict';

const express = require('express');

const { createUsersService } = require('./services/usersService');
const { createExpensesService } = require('./services/expensesService');

const { createUsersController } = require('./controllers/usersController');
const {
  createExpensesController,
} = require('./controllers/expensesController');

const { createUsersRouter } = require('./routes/users');
const { createExpensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  const usersService = createUsersService(users);
  const expensesService = createExpensesService(users, expenses);

  const usersController = createUsersController(usersService);
  const expensesController = createExpensesController(expensesService);

  app.use('/users', createUsersRouter(usersController));
  app.use('/expenses', createExpensesRouter(expensesController));

  return app;
}

module.exports = {
  createServer,
};
