'use strict';

const express = require('express');

const router = express.Router();

const expensesController = require('../controllers/expenses');

router.get('/', expensesController.getAllExpenses);

router.post('/', expensesController.addExpense);

router.get('/:id', expensesController.getExpenseById);

router.delete('/:id', expensesController.removeExpenseById);

router.patch('/:id', expensesController.updateExpenseById);

module.exports = router;
