'use strict';

const express = require('express');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

const usersController = require('./controllers/users');
const expensesController = require('./controllers/expenses');

function createServer() {
  const app = express();

  usersService.init();
  expensesService.init();

  app.get('/users', usersController.getAll);

  app.post('/users', express.json(), usersController.addOne);

  app.get('/users/:userId', usersController.getOne);

  app.delete('/users/:userId', usersController.deleteOne);

  app.patch('/users/:userId', express.json(), usersController.updateOne);

  app.get('/expenses', expensesController.getAll);

  app.post('/expenses', express.json(), expensesController.addOne);

  app.get('/expenses/:expenseId', expensesController.getOne);

  app.delete('/expenses/:expenseId', expensesController.deleteOne);

  app.patch('/expenses/:expenseId', express.json(), expensesController.updateOne);

  return app;
}

module.exports = {
  createServer,
};
