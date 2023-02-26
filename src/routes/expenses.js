'use strict';

const express = require('express');
const expensesConroller = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesConroller.getAll);
router.get('/:expenseId', expensesConroller.getExpense);
router.post('/', express.json(), expensesConroller.createExpense);
router.delete('/:expenseId', expensesConroller.deleteExpense);
router.patch('/:expenseId', express.json(), expensesConroller.updateExpense);

module.exports = { router };
