'use strict';

const usersRouter = require('./routes/users');

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
