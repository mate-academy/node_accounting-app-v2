'use strict';

const express = require('express');
const userController = require('./controllers/user.controller.js');
const expensesController = require('./controllers/expense.controller.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', userController.getAll);
  app.get('/users/:id', userController.getById);
  app.post('/users', userController.create);
  app.delete('/users/:id', userController.remove);
  app.patch('/users/:id', userController.patch);

  app.get('/expenses', expensesController.getAll);
  app.get('/expenses/:id', expensesController.getById);
  app.post('/expenses', expensesController.create);
  app.delete('/expenses/:id', expensesController.remove);
  app.patch('/expenses/:id', expensesController.patch);

  return app;
}

module.exports = {
  createServer,
};
