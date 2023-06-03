'use strict';

const express = require('express');
const cors = require('cors');
const userController = require('./controllers/usersController');
const userService = require('./service/users');
const expensesController = require('./controllers/expensesController');
const expensesService = require('./service/expenses');

function createServer() {
  userService.reset();
  expensesService.reset();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/users', userController.getAll);
  app.get('/users/:userId', userController.getUser);
  app.post('/users', userController.add);
  app.delete('/users/:userId', userController.remove);
  app.patch('/users/:userId', userController.update);

  app.get('/expenses', expensesController.getAll);
  app.get('/expenses/:expenseId', expensesController.getById);
  app.post('/expenses', expensesController.add);
  app.patch('/expenses/:expenseId', expensesController.update);
  app.delete('/expenses/:expenseId', expensesController.remove);

  return app;
}

const server = createServer();

server.listen(3000);

module.exports = {
  createServer,
};
