'use strict';

const express = require('express');
const { expenseController } = require('./expense.controller');

const router = express.Router();

router.get('/', expenseController.getExpenses);
router.get('/:expenseId', expenseController.getExpensesById);
router.post('/', express.json(), expenseController.addExpense);
router.patch('/:expenseId', express.json(), expenseController.updateExpense);
router.delete('/:expenseId', expenseController.deleteExpense);

module.exports = {
  router: router,
};
