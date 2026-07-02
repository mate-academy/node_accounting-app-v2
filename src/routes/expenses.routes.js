'use strict';

const { Router } = require('express');

const {
  createExpense,
  deletExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} = require('../controllers/expenses.controller');

const expensesRoutes = Router();

expensesRoutes.get('/', getExpenses);
expensesRoutes.post('/', createExpense);
expensesRoutes.get('/:id', getExpenseById);
expensesRoutes.delete('/:id', deletExpense);
expensesRoutes.patch('/:id', updateExpense);

module.exports = {
  expensesRoutes,
};
