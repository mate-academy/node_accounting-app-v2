'use strict';

const express = require('express');
const {
  getExpenses,
  getOneExpense,
  addExpense,
  remove,
  update,
} = require('../controllers/expenses.js');

const expensesRouter = express.Router();

expensesRouter.get('/', getExpenses);

expensesRouter.get('/:expenseId', getOneExpense);

expensesRouter.post('/', express.json(), addExpense);

expensesRouter.delete('/:expenseId', remove);

expensesRouter.patch('/:expenseId', express.json(), update);

module.exports = { expensesRouter };
