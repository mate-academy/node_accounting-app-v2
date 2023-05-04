'use strict';

const express = require('express');

const expenseController = require('./controllers/expenses');
const userController = require('./controllers/users');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/expenses', expenseController.getAll);
  app.get('/expenses/:expenseId', expenseController.getOne);
  app.post('/expenses', expenseController.add);
  app.delete('/expenses/:expenseId', expenseController.remove);
  app.patch('/expenses/:expenseId', expenseController.change);

  app.get('/users', userController.getAll);
  app.get('/users/:userId', userController.getOne);
  app.post('/users', userController.add);
  app.delete('/users/:userId', userController.remove);
  app.patch('/users/:userId', userController.change);

  expenseController.reset();
  userController.reset();

  return app;
}

module.exports = {
  createServer,
};
