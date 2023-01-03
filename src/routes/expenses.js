'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getExpenses);
router.get('/:expenseId', expensesController.getExpenseById);
router.post('/', express.json(), expensesController.addExpense);
router.delete('/:expenseId', expensesController.removeExpense);
router.patch('/:expenseId', express.json(), expensesController.updateExpense);

module.exports = router;
