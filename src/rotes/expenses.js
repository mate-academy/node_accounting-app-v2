'use strict';

const express = require('express');

const router = express.Router();

const {
  getExpenses,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
} = require('../controlers/expenses');

router.get('/', getExpenses);
router.get('/:expenseId', getExpenseById);
router.post('/', createExpense);
router.delete('/:expenseId', removeExpense);
router.patch('/:expenseId', updateExpense);

module.exports = {
  router,
};
