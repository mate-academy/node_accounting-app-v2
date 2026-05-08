'use strict';

const { usersController } = require('./controllers');
const { expensesController } = require('./controllers');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

const express = require('express');

function createServer() {
  usersService.clearUsers();
  expensesService.clearExpenses();

  const app = express();

  app.use(express.json());

  app.get('/users', usersController.getAll);

  app.post('/users', usersController.create);

  app.get('/users/:id', usersController.getById);

  app.patch('/users/:id', usersController.update);

  app.delete('/users/:id', usersController.delete);

  app.get('/expenses', expensesController.getAll);
  app.post('/expenses', expensesController.create);
  app.get('/expenses/:id', expensesController.getById);
  app.delete('/expenses/:id', expensesController.delete);
  app.patch('/expenses/:id', expensesController.update);

  return app;
}

module.exports = {
  createServer,
};
