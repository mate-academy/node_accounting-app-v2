'use strict';

const express = require('express');
const cors = require('cors');
const usersService = require('./services/users.services');
const expensesService = require('./services/expenses.services');
const userControllers = require('./controllers/users.controller.js');
const expensesControllers = require('./controllers/expenses.controller.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.get('/expenses', expensesControllers.getAll);
  app.post('/expenses', expensesControllers.addExpense);
  app.get('/expenses/:id', expensesControllers.getExpense);
  app.delete('/expenses/:id', expensesControllers.removeExpense);
  app.patch('/expenses/:id', expensesControllers.updateExpense);
  app.get('/users', userControllers.getAll);
  app.post('/users', userControllers.addUser);
  app.get('/users/:id', userControllers.getUser);
  app.delete('/users/:id', userControllers.removeUser);
  app.patch('/users/:id', userControllers.changeUser);
  expensesService.changeExpense([]);
  usersService.changeUsers([]);

  return app;
}

module.exports = {
  createServer,
};
