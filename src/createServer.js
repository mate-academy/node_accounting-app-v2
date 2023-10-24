'use strict';

const express = require('express');
const userController = require('./controller/user.controller.js');
const expensesController = require('./controller/expenses.controller.js');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/users', userController.getAll);
  app.get('/users/:id', userController.getOne);
  app.post('/users', userController.addUser);
  app.patch('/users/:id', userController.editUser);
  app.delete('/users/:id', userController.delUser);

  app.get('/expenses', expensesController.getAll);
  app.get('/expenses/:id', expensesController.getOne);
  app.post('/expenses', expensesController.addExpense);
  app.delete('/expenses/:id', expensesController.delExpense);
  app.patch('/expenses/:id', expensesController.editExpense);

  return app;
};

module.exports = { createServer };
