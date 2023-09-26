'use strict';

const express = require('express');
const router = express.Router();

const {
  getExpenseById,
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenses');

router.get('/', getAllExpenses);
router.get('/:expenseId', getExpenseById);
router.post('/', createExpense);
router.patch('/:expenseId', updateExpense);
router.delete('/:expenseId', deleteExpense);

module.exports = router;
