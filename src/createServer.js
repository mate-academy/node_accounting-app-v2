'use strict';

const express = require('express');
const { createUsers } = require('./collections/users');
const { createExpenses } = require('./collections/expenses');

function createServer() {
  const userMethods = createUsers();
  const expensesMethods = createExpenses();

  const app = express();

  app.get('/users', userMethods.getAll);
  app.get('/users/:id', userMethods.getOne);
  app.post('/users', express.json(), userMethods.post);
  app.delete('/users/:id', userMethods.delete);
  app.patch('/users/:id', express.json(), userMethods.patch);

  app.get('/expenses', express.json(), expensesMethods.getAll);
  app.get('/expenses/:id', expensesMethods.getOne);

  app.post(
    '/expenses',
    express.json(),
    expensesMethods.post(userMethods.users)
  );
  app.delete('/expenses/:id', expensesMethods.delete);
  app.patch('/expenses/:id', express.json(), expensesMethods.patch);

  return app;
}

module.exports = {
  createServer,
};
