'use strict';

const express = require('express');
const cors = require('cors');
const { UserController } = require('./controllers/users.controller');
const { ExpensesController } = require('./controllers/expenses.controller');
const { UserServices } = require('./services/users.service');
const { ExpenseServises } = require('./services/expenses.service');

function createServer() {
  const app = express();

  UserServices.clearUsers();
  ExpenseServises.clearExpenses();

  app.use(cors());

  app.get('/users', UserController.getUsers);

  app.get('/users/:id', UserController.getUser);

  app.post('/users', express.json(), UserController.createUser);

  app.delete('/users/:id', UserController.deleteUser);

  app.patch('/users/:id', express.json(), UserController.updateUser);

  app.get('/expenses', ExpensesController.getExpenses);

  app.get('/expenses/:id', ExpensesController.getExpense);

  app.delete('/expenses/:id', ExpensesController.deleteExpense);

  app.post('/expenses', express.json(), ExpensesController.createExpense);

  app.patch('/expenses/:id', express.json(), ExpensesController.updateExpense);

  return app;
}

module.exports = {
  createServer,
};
