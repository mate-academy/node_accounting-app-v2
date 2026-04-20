'use strict';

const expenses = require('./controllers/expenses');

const users = require('./controllers/users');

const express = require('express');

function createServer() {
  const app = express();

  const userData = [];
  const expenseData = [];
  let expenseId = 1;
  let userId = 1;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('test');
  });

  app.get('/expenses', (req, res) => {
    return expenses.getExpenses(req, res, expenseData);
  });

  app.get('/expenses/:id', (req, res) => {
    return expenses.getExpenseById(req, res, expenseData);
  });

  app.post('/expenses', (req, res) => {
    return expenses.createExpense(
      req,
      res,
      expenseData,
      userData,
      () => (expenseId += 1),
    );
  });

  app.delete('/expenses/:id', (req, res) => {
    return expenses.deleteExpense(req, res, expenseData);
  });

  app.patch('/expenses/:id', (req, res) => {
    return expenses.updateExpense(req, res, expenseData);
  });

  app.get('/users', (req, res) => {
    return users.getUsers(req, res, userData);
  });

  app.get('/users/:id', (req, res) => {
    return users.getUserById(req, res, userData);
  });

  app.post('/users', (req, res) => {
    return users.createUser(req, res, userData, () => (userId += 1));
  });

  app.patch('/users/:id', (req, res) => {
    return users.updateUser(req, res, userData);
  });

  app.delete('/users/:id', (req, res) => {
    return users.deleteUser(req, res, userData);
  });

  /*
  app.put('/users', (req, res) => {
    res.status(200).json(users);
  });
  */

  return app;
}

module.exports = {
  createServer,
};
