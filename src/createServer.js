'use strict';

// import express from 'express';
const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  // app.get('/', (req, res) => {
  //   res.sendStatus(200);
  // });

  return app;
}

module.exports = { createServer };
