'use strict';

const express = require('express');
const { usersController } = require('./users/users.controller');
const { usersService } = require('./users/users.service');
const { expensesService } = require('./expenses/expenses.service');
const { expensesController } = require('./expenses/expenses.controller');

function createServer() {
  const app = express();

  app.use(express.json());

  expensesService.deleteExpenses();
  usersService.deleteUsers();

  app.get('/users', usersController.getAllUsers);

  app.post('/users', usersController.addNextUser);

  app.delete('/users/:userId', usersController.deleteUser);

  app.get('/users/:userId', usersController.getOneUser);

  app.put('/users/:userId', usersController.userToUpdate);

  app.get('/expenses', expensesController.getAllExpenses);

  app.post('/expenses', expensesController.addNextExpense);

  app.delete('/expenses/:expenseId', expensesController.deleteExpense);

  app.get('/expenses/:expenseId', expensesController.getOneExpense);

  app.put('/expenses/:expenseId', expensesController.expenseToUpdate);

  return app;
}

module.exports = {
  createServer,
};
