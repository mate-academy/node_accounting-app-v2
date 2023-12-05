'use strict';

const expenseController = require('../controllers/expenses.controller');

const express = require('express');

const router = express.Router();

router.get('/', expenseController.getAllExpenses);

router.post('/', expenseController.createExpense);

router.get('/:id', expenseController.getExpenseById);

router.delete('/:id', expenseController.deleteExpense);

router.patch('/:id', expenseController.updateExpense);

module.exports = {
  router,
};
