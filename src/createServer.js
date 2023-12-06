'use strict';

const express = require('express');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');
const userController = require('./controllers/user.controller');
const expenseController = require('./controllers/expense.controller');

function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.get('/users', userController.getAll);

  app.post('/users', express.json(), userController.create);

  app.get('/users/:id', userController.getOne);

  app.delete('/users/:id', userController.remove);

  app.patch('/users/:id', express.json(), userController.update);

  app.get('/expenses', expenseController.getAll);

  app.post('/expenses', express.json(), expenseController.create);

  app.get('/expenses/:id', expenseController.getOne);

  app.delete('/expenses/:id', expenseController.remove);

  app.patch('/expenses/:id', express.json(), expenseController.update);

  return app;
}

module.exports = {
  createServer,
};
