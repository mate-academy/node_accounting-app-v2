'use strict';

const cors = require('cors');
const express = require('express');
const { usersRouter } = require('./users/router');
const { expensesRouter } = require('./expenses/router');

function createServer() {
  const server = express();

  server.use(
    cors({
      origin: '*',
      methods: 'GET, POST, PUT, DELETE',
      allowedHeaders: 'Content-Type',
      credentials: true,
    }),
  );

  server.get('/', (req, res) => res.send('hello node'));

  server.use('/', usersRouter);

  server.use('/', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
