/* eslint-disable no-useless-return */
'use strict';

const express = require('express');
const cors = require('cors');
const userControllers = require('./controllers/user.controller');
const expensesControllers = require('./controllers/expenses.controller');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(cors());

  // #region users
  app.get('/users', userControllers.get);

  app.get('/users/:id', userControllers.getOne);

  app.post('/users', express.json(), userControllers.create);

  app.delete('/users/:id', userControllers.remove);

  app.patch('/users/:id', express.json(), userControllers.update);
  // #endregion

  app.get('/expenses', expensesControllers.get);

  app.get('/expenses/:id', expensesControllers.getOne);

  app.post('/expenses', express.json(), expensesControllers.create);

  app.patch('/expenses/:id', express.json(), expensesControllers.update);

  app.delete('/expenses/:id', expensesControllers.remove);

  return app;
}

module.exports = {
  createServer,
};
