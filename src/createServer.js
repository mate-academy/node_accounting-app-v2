'use strict';

const { usersController } = require('./controllers/users.controller');
const { expensesController } = require('./controllers/expenses.controller');
const { usersService } = require('./services/users.service');
const { expensesService } = require('./services/expenses.service');

const express = require('express');

function createServer() {
  usersService.clear();
  expensesService.clear();

  const server = express();

  server.use(express.json());

  server.get('/users', usersController.getAll);
  server.post('/users', usersController.add);
  server.get('/users/:id', usersController.getById);
  server.delete('/users/:id', usersController.remove);
  server.patch('/users/:id', usersController.update);

  server.get('/expenses', expensesController.getAll);
  server.post('/expenses', expensesController.add);
  server.get('/expenses/:id', expensesController.getById);
  server.delete('/expenses/:id', expensesController.remove);
  server.patch('/expenses/:id', expensesController.update);

  return server;
}

module.exports = {
  createServer,
};
