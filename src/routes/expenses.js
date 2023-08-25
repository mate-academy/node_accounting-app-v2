'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);
router.post('/', expensesController.createExpense);
router.get('/:expenseId', expensesController.getExpenseById);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', expensesController.update);

module.exports = { router };
