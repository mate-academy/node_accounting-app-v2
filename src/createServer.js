'use strict';

const { controllerDeleteUser,
  controllerGetAllUsers,
  controllerGetUserById,
  controllerPostUser,
  controllerUpdateUser,
  usersArray } = require('./controllers/users');
const { controllerPostExpense,
  controllerGetExpenses,
  controllerGetExpenseById,
  controllerDeleteExpense,
  controllerPatchExpense,
  expensesArray } = require('./controllers/expenses');

const express = require('express');

function createServer() {
  const app = express();

  app.post('/users', express.json(), controllerPostUser);

  app.get('/users', controllerGetAllUsers);

  app.get('/users/:userId', controllerGetUserById);

  app.delete('/users/:userId', controllerDeleteUser);

  app.patch('/users/:userId', express.json(), controllerUpdateUser);

  usersArray();

  // ////////

  app.post('/expenses', express.json(), controllerPostExpense);

  app.get('/expenses', controllerGetExpenses);

  app.get('/expenses/:expenseId', controllerGetExpenseById);

  app.delete('/expenses/:expenseId', controllerDeleteExpense);

  app.patch('/expenses/:expenseId', express.json(), controllerPatchExpense);

  expensesArray();

  return app;
}

module.exports = {
  createServer,
};
