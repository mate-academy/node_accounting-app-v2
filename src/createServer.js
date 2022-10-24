'use strict';

const express = require('express');
const cors = require('cors');

const userServices = require('./services/users');
const expenseServices = require('./services/expenses');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use('/users', usersRouter);

  // нужно каждый раз чистить массив с данными
  // так как до этого допустим при входе нового пользователя
  // у него были данные пользователя старого
  // и чтобы новый пользователь не имел доступ к данным старого
  // нам нужно почистить массив с данными
  // это очищение происходит после
  // выполнения запроса в app.use('/users', usersRouter);
  userServices.initUsers();

  app.use('/expenses', expensesRouter);

  expenseServices.initExpenses();

  return app;
}

module.exports = {
  createServer,
};
