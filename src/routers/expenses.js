'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');
const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getExpenseById);
router.post('/', expensesController.addExpense);
router.patch('/:expenseId', expensesController.updateExpenseById);
router.delete('/:expenseId', expensesController.removeExpenseById);

module.exports = router;
