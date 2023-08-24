'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenses');

router.get('/', controller.getExpenses);

router.post('/', express.json(), controller.createExpense);

router.get('/:expenseId', controller.getExpenseById);

router.delete('/:expenseId', controller.deleteExpense);

router.patch('/:expenseId', express.json(), controller.updateExpense);

module.exports = router;
