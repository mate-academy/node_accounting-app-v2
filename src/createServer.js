'use strict';

const express = require('express');

const cors = require('cors');

const { createUsers } = require('./routes/users');
const { createExpense } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  createUsers(app);
  createExpense(app);

  return app;
}

module.exports = {
  createServer,
};
