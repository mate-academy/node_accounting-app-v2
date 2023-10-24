'use strict';

const express = require('express');
const userController = require('./controller/user.controller.js');
const expensesController = require('./controller/expenses.controller.js');
const { users } = require('./data/users.js');
const { expenses } = require('./data/expenses.js');

const createServer = () => {
  const app = express();

  users.length = 0;
  expenses.length = 0;

  app.get('/users', userController.getAll);
  app.get('/users/:id', userController.getOne);
  app.post('/users', express.json(), userController.addUser);
  app.patch('/users/:id', express.json(), userController.editUser);
  app.delete('/users/:id', userController.delUser);

  app.get('/expenses', expensesController.getAll);
  app.get('/expenses/:id', expensesController.getOne);
  app.post('/expenses', express.json(), expensesController.addExpense);
  app.delete('/expenses/:id', expensesController.delExpense);
  app.patch('/expenses/:id', express.json(), expensesController.editExpense);

  return app;
};

module.exports = { createServer };
