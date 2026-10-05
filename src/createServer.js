'use strict';

const { createUsersService } = require('./services/usersService');
const { createUsersController } = require('./controllers/usersController');
const { createUsersRoutes } = require('./routes/usersRoutes');
const { createExpensesService } = require('./services/expensesService');
const {
  createExpensesController,
} = require('./controllers/expensesController');
const { createExpensesRoutes } = require('./routes/expensesRoutes');

const express = require('express');

function createServer() {
  const app = express();
  const users = [];
  const usersService = createUsersService(users);
  const usersController = createUsersController(usersService);
  const usersRoutes = createUsersRoutes(usersController);

  const expenses = [];
  const expensesService = createExpensesService(expenses, usersService);
  const expensesController = createExpensesController(expensesService);
  const expensesRoutes = createExpensesRoutes(expensesController);

  app.use(express.json());
  app.use('/users', usersRoutes);
  app.use('/expenses', expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
