'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/:expenseId', expensesController.getExpense);
router.get('/', expensesController.getExpenses);
router.delete('/:expenseId', expensesController.deleteExpense);
router.post('/', expensesController.addExpense);
router.patch('/:expenseId', expensesController.updateExpense);

module.exports.expensesRouter = router;
