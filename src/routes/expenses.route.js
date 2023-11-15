'use strict';

const express = require('express');
const {
  createExpense,
  getAllExpense,
  getByIdExpense,
  updateExpense,
  removeExpense,
} = require('../controllers/expense.controller');

const expensesRouter = express.Router();

expensesRouter.post('/', createExpense);

expensesRouter.get('/', getAllExpense);

expensesRouter.get('/:expenseId', getByIdExpense);

expensesRouter.patch('/:expenseId', updateExpense);

expensesRouter.delete('/:expenseId', removeExpense);

module.exports = {
  expensesRouter,
};
