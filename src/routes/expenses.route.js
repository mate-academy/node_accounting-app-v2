const express = require('express');
const expenseController = require('../controllers/expenses.controller');

const router = express.Router();

router.post('/', expenseController.createExpense);

router.get('/', expenseController.getExpenses);

router.get('/:id', expenseController.getExpenseById);

router.patch('/:id', expenseController.updateExpense);

router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
