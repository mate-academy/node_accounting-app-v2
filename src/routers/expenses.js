'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses');

router.use(express.json());

router.get('/', expensesController.getExpenses);

router.post('/', expensesController.createExpense);

router.get('/:expenseId', expensesController.getExpenseById);

router.delete('/:expenseId', expensesController.deleteExpense);

router.patch('/:expenseId', expensesController.updateExpense);

module.exports = router;
