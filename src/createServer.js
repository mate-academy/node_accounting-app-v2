'use strict';

const express = require('express');
const cors = require('cors');
const userController = require('./controllers/users.js');
const expenseController = require('./controllers/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.get('/users', userController.getAll);

  app.get('/users/:userId', userController.getOne);

  app.post('/users', express.json(), userController.add);

  app.delete('/users/:userId', userController.remove);

  app.patch('/users/:userId', express.json(), userController.update);

  app.get('/expenses', expenseController.getAll);

  app.get('/expenses/:expenseId', expenseController.getOne);

  app.post('/expenses', express.json(), expenseController.add);

  app.delete('/expenses/:expenseId', expenseController.remove);

  app.patch('/expenses/:expenseId', express.json(), expenseController.update);

  return app;
}

module.exports = {
  createServer,
};
