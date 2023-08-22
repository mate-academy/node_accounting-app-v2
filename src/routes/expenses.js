'use strict';

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses');

router.get('/', expenseController.getAllExpenses);
router.get('/:expenseId', expenseController.getOneExpense);
router.post('/', expenseController.addExpense);
router.patch('/:expenseId', expenseController.updateExpense);
router.delete('/:expenseId', expenseController.removeExpense);

module.exports = { router };
