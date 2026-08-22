'use strict';

const express = require('express');
const cors = require('cors');

const { createUsersRouter } = require('./routes/user.route');
const { createExpensesRouter } = require('./routes/expenses.route');
const { createUsersService } = require('./service/users.service');
const { createExpensesService } = require('./service/expenses.service');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const usersService = createUsersService();
  const expensesService = createExpensesService(usersService);

  app.use('/users', createUsersRouter(usersService));
  app.use('/expenses', createExpensesRouter(expensesService));

  return app;
}

module.exports = {
  createServer,
};
