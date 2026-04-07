'use strict';

const usersController = require('./users/users.controller');
const usersService = require('./users/users.service');
const expenseController = require('./expenses/expenses.controller');
const expenseService = require('./expenses/expenses.service');
const express = require('express');

function createServer() {
  const app = express();

  expenseService.clear();
  usersService.clear();

  app.use(express.json());

  app.get('/users', usersController.getAll);
  app.get('/users/:id', usersController.getById);
  app.post('/users', usersController.create);
  app.delete('/users/:id', usersController.deleteById);
  app.patch('/users/:id', usersController.updateUser);

  app.get('/expenses', expenseController.getAll);
  app.get('/expenses/:id', expenseController.getById);
  app.post('/expenses', expenseController.create);
  app.delete('/expenses/:id', expenseController.deleteById);
  app.patch('/expenses/:id', expenseController.updateExpense);

  return app;
}

module.exports = {
  createServer,
};
