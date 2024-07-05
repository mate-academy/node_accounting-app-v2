'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(userRoutes);
  app.use(expenseRoutes);

  return app;
}

module.exports = {
  createServer,
};
