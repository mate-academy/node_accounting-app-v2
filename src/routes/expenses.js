'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');
const { validateExpenses } = require('../middleware/expensesValidation');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);
router.get('/:expensesId', expensesController.getExpense);

router.post('/', validateExpenses, expensesController.createExpense);
router.patch('/:expensesId', expensesController.updateExpense);
router.delete('/:expensesId', expensesController.deleteExpense);

module.exports = { router };
