'use strict';

const express = require('express');
const routerUsers = require('./router/users.router.js');
const routerExpenses = require('./router/expense.router.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.use('/users', routerUsers);

  app.use('/expenses', routerExpenses);

  return app;
}

module.exports = {
  createServer,
};
