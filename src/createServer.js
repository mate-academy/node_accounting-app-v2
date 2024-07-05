'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), userRouter);

  return app;
}

module.exports = {
  createServer,
};
