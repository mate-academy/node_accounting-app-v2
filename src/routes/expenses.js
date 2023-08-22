'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');
const router = express.Router();

router.get('/', expensesController.getExpenses);

router.get('/:id', expensesController.getExpenseById);

router.post('/', expensesController.createExpense);

router.delete('/:id', expensesController.deleteExpense);

router.patch('/:id', expensesController.updateExpense);

module.exports = router;
