'use strict';

import express from 'express';
import { router as usersRouter } from './routes/users.js';
import { router as expensesRouter } from './routes/expenses.js';

export const createServer = express();

createServer.use('/users', express.json(), usersRouter);
createServer.use('/expenses', express.json(), expensesRouter);

