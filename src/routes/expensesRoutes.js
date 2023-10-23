'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

router.get('/expenses', expensesController.getExpenses);
router.get('/expenses/:id', expensesController.getExpenseById);
router.post('/expenses', expensesController.createExpense);
router.patch('/expenses/:id', expensesController.updateExpense);
router.delete('/expenses/:id', expensesController.deleteExpense);

module.exports = router;
