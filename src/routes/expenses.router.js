const express = require('express');
const {
  getAllExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expense.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);

expensesRouter.post('/', createExpense);

expensesRouter.get('/:id', getExpense);

expensesRouter.delete('/:id', deleteExpense);

expensesRouter.patch('/:id', updateExpense);

module.exports = { expensesRouter };
