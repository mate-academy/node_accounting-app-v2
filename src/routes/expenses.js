'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses.js');

router.get('/', expensesController.getAllExpenses);

router.get('/:expenseId', expensesController.getExpenseById);

router.post('/', expensesController.createExpense);

router.delete('/:expenseId', expensesController.deleteExpense);

router.patch('/:expenseId', expensesController.updateExpense);

module.exports = { router };
