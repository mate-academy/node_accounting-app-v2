const express = require('express');
const {
  createExpense,
  getExpenses,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
} = require('../controllers/expenses.controller.js');

const router = express.Router();

router.get('/', getExpenses);
router.post('/', createExpense);
router.get('/:id', getExpenseById);
router.delete('/:id', deleteExpenseById);
router.patch('/:id', updateExpenseById);

module.exports = { expensesRoutes: router };
