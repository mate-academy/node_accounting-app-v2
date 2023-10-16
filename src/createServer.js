'use strict';

const userRouter = require('./routes/user.route');
const userServices = require('./services/user.service');
const expenseRouter = require('./routes/expense.route');

const express = require('express');
const PORT = 5000;

function createServer() {
  const app = express();

  userServices.clear();
  app.use('/users', express.json(), userRouter);
  app.use('/expense', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};

const server = createServer();

server.listen(PORT, () => { });
