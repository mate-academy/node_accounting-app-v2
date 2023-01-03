'use strict';

// import express from 'express';
const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const { clearExpenses } = require('./services/expenses');
const { clearUsers } = require('./services/users');

function createServer() {
  clearUsers();

  clearExpenses();

  const app = express();

  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
