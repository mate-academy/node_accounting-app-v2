'use strict';

const ExpenseController = require('../controllers/expenses');

const express = require('express');

const router = express.Router();

router.get('/', ExpenseController.getAllExpenses);

router.post('/', ExpenseController.addNewExpense);

router.get('/:expenseId', ExpenseController.getOneExpense);

router.delete('/:expenseId', ExpenseController.deleteExpense);

router.patch('/:expenseId', ExpenseController.updateExpense);

module.exports = {
  router,
};
