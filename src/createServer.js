'use strict';

const userRouter = require('./routes/user.route');

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), userRouter);

  return app;
}

module.exports = {
  createServer,
};
