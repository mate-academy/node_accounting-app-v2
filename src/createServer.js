'use strict';

const express = require('express');
const { UsersController } = require('./controllers/users.controller');
const { ExpensesController } = require('./controllers/expenses.controller');
const { UserService } = require('./services/users.service');
const { ExpenseService } = require('./services/expenses.service');

function createServer() {
  const app = express();

  UserService.clear();
  ExpenseService.clear();

  app.get('/users', UsersController.getAll);
  app.get('/users/:id', UsersController.getById);
  app.post('/users', express.json(), UsersController.create);
  app.delete('/users/:id', UsersController.remove);
  app.patch('/users/:id', express.json(), UsersController.update);

  app.get('/expenses', ExpensesController.getAll);
  app.get('/expenses/:id', ExpensesController.getById);
  app.post('/expenses', express.json(), ExpensesController.create);
  app.delete('/expenses/:id', ExpensesController.remove);
  app.patch('/expenses/:id', express.json(), ExpensesController.update);

  return app;
}

module.exports = {
  createServer,
};
