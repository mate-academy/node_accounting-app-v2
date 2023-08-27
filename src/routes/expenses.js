'use strict';

const express = require('express');
const router = express.Router();
const expenses = [];
const users = [];

const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenses.js');

router.get('/', getAllExpenses(expenses));
router.get('/:expense/Id', getExpenseById(expenses));
router.post('/', createExpense(expenses, users));
router.patch('/:expenseId', updateExpense(expenses));
router.delete('/:expenseId', deleteExpense(expenses));

module.exports = router;
