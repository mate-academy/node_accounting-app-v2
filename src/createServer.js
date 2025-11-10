'use strict';

const express = require('express');
const routes = require('./routes/index.routes');

let users = [];
let expenses = [];
let nextUserId = 1;
let nextExpenseId = 1;

function createServer() {
  users = [];
  expenses = [];
  nextUserId = 1;
  nextExpenseId = 1;

  const app = express();

  app.locals.users = users;
  app.locals.expenses = expenses;
  app.locals.nextUserId = () => nextUserId++;
  app.locals.nextExpenseId = () => nextExpenseId++;

  app.locals.reset = () => {
    users.length = 0;
    expenses.length = 0;
    nextUserId = 1;
    nextExpenseId = 1;
  };

  app.use(express.json());

  app.use('/', routes);

  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).send('Internal Server Error');
  });

  return app;
}

module.exports = {
  createServer,
};
