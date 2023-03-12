'use strict';

const express = require('express');
const cors = require('cors');
const { userServices } = require('./services/usersServices');
const { expensesServices } = require('./services/expensesServices');
const { expenseControllers } = require('./controllers/expenses');
const { usersControllers } = require('./controllers/users');

function createServer() {
  const app = express();

  app.use(cors());

  userServices.getDefault();
  expensesServices.getDefault();

  app.get('/users', usersControllers.getAll);

  app.get('/users/:userId', usersControllers.getUserById);

  app.post('/users', express.json(), usersControllers.addUser);

  app.delete('/users/:userId', usersControllers.deleteUser);

  app.patch('/users/:userId', express.json(), usersControllers.updateUser);

  app.get('/expenses', expenseControllers.getAllExpense);

  app.get('/expenses/:expenseId', expenseControllers.getExpenseById);

  app.post('/expenses', express.json(), expenseControllers.addExpense);

  app.delete('/expenses/:expenseId', expenseControllers.deleteExpense);

  app.patch('/expenses/:expenseId',
    express.json(),
    expenseControllers.updateExpense);

  return app;
}

module.exports = {
  createServer,
};
