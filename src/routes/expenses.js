'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getExpenses);
router.get('/:expenseId', expenseController.getExpense);
router.post('/', expenseController.createExpense);
router.delete('/:expenseId', expenseController.deleteExpense);
router.patch('/:expenseId', expenseController.updateExpense);

module.exports = router;
