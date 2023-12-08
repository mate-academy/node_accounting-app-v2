'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const expensRouter = require('./routes/expens.router');

function createServer() {
  const app = express();

  // const expenses = [];

  app.use(cors());
  app.use('/users', express.json(), userRouter.router);
  app.use('/expenses', express.json(), expensRouter.router);

  return app;
}

module.exports = {
  createServer,
};

// Use express to create a server
// Add a routes to the server
// Return the server (express app)
