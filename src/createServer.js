'use strict';

const express = require('express');
const cors = require('cors');

const userRouter = require('./router/users.routes');
const expensesRouter = require('./router/expenses.routes');

function createServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).send('Server is running');
  });

  app.use('/users', userRouter);

  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
