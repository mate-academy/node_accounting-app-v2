'use strict';

const express = require('express');
const {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenses');

const router = express.Router();

router.get('/expenses', getExpenses);

router.get('/expenses/:id', getExpenseById);

router.post('/expenses', createExpense);

router.delete('/expenses/:id', deleteExpense);

router.patch('/expenses/:id', updateExpense);

module.exports = router;
