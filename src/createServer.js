'use strict';

const cors = require('cors');
const express = require('express');
const categoriesRouter = require('./routes/categories.router.js');
const expensesRouter = require('./routes/expenses.router.js');
const categoryService = require('./services/categories.service.js');
const expenseService = require('./services/expenses.service.js');

function createServer() {
  const app = express();

  categoryService.resetCategories();
  expenseService.resetExpenses();

  app.use(cors());
  app.use(express.json());
  app.use('/users', categoriesRouter);
  // app.use('/categories', categoriesRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
