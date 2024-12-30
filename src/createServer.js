'use strict';

const userRoutes = require('./routes/userRoute');
const expensesRoutes = require('./routes/productRoute');

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRoutes);
  app.use('/expenses', expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
