/* eslint-disable no-shadow */
'use strict';

const express = require('express');
const cors = require('cors');
const { createUsers } = require('./routers/user');
const { createExpense } = require('./routers/expenses');

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
