'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseControllers');

const router = express.Router();

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.createExpense);
router.get('/:id', expenseController.getExpenseById);
router.patch('/:id', expenseController.updateExpenseById);
router.delete('/:id', expenseController.removeExpenseById);

module.exports = {
  router,
};
