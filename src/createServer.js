'use strict';
import express from 'express';
import { router as usersRouter } from './routes/users.route.js';
import { router as expensesRouter } from './routes/expenses.route.js';
import { users } from './services/users.service.js';
import { expenses } from './services/expenses.service.js';

// const express = require('express');

export function createServer() {
  const app = express();

  users.length = 0;
  expenses.length = 0;

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  return app;
}
