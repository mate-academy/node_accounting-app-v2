'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses.controller');

router.get('/', expensesController.getFilteredExpenses);

router.get('/:expenseId', expensesController.getOneExpense);

router.post('/', expensesController.addExpense);

router.delete('/:expenseId', expensesController.deleteExpense);

router.patch('/:expenseId', expensesController.updateExpense);

module.exports = {
  expenseRouter: router,
};
