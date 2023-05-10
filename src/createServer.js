/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
'use strict';

const userController = require('./controller/users.js');
const expenseController = require('./controller/expenses.js');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

function createServer() {
  app.get('/users', userController.getAllUsers);

  app.get('/expenses', expenseController.getAllExpenses);

  app.get('/users/:userId', userController.getOneUser);

  app.get('/expenses/:expenseId', expenseController.getOneExpense);

  app.post('/users', express.json(), userController.createUser);

  app.post('/expenses', express.json(), expenseController.createExpense);

  app.delete('/users/:userId', express.json(), userController.deleteUser);

  app.delete(
    '/expenses/:expenseId',
    express.json(),
    expenseController.deleteExpense
  );

  app.patch('/users/:userId', express.json(), userController.updateUser);

  app.patch(
    '/expenses/:expenseId',
    express.json(),
    expenseController.updateExpense
  );

  return app;
}

module.exports = {
  createServer,
};
