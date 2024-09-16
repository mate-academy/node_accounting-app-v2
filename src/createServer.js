'use strict';

const express = require('express');
const { createUsers } = require('./collections/users');
const { createExpenses } = require('./collections/expenses');

function createServer() {
  const userMethods = createUsers();
  const expensesMethods = createExpenses();

  const app = express();

  app.use(express.json());

  app.get('/users', userMethods.getAll);
  app.get('/users/:id', userMethods.getOne);
  app.post('/users', userMethods.post);
  app.delete('/users/:id', userMethods.delete);
  app.patch('/users/:id', userMethods.patch);

  app.get('/expenses', expensesMethods.getAll);
  app.get('/expenses/:id', expensesMethods.getOne);
  app.post('/expenses', expensesMethods.post(userMethods.users));
  app.delete('/expenses/:id', expensesMethods.delete);
  app.patch('/expenses/:id', expensesMethods.patch);

  return app;
}

module.exports = {
  createServer,
};
