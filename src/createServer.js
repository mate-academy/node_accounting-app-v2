'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', userRouter);

  return app;
}

module.exports = {
  createServer,
};
