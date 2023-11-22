'use strict';

const express = require('express');
const {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpenseInfo,
  removeExpense,
} = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.post('/expenses', express.json(), createExpense);
expensesRouter.patch('/expenses/:id', express.json(), updateExpenseInfo);
expensesRouter.delete('/expenses/:id', removeExpense);
expensesRouter.get('/expenses', getAllExpenses);
expensesRouter.get('/expenses/:id', express.json(), getOneExpense);

module.exports = expensesRouter;
