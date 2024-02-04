'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.controller');
const router = express.Router();

router.get('/', expenseController.getExpenses);
router.post('/', express.json(), expenseController.createNewExpense);
router.get('/:id', express.json(), expenseController.getExpenseById);
router.delete('/:id', expenseController.deleteExpense);
router.patch('/:id', express.json(), expenseController.editExpense);

module.exports = router;
