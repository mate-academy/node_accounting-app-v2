'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controllers');

const router = express.Router();

router
  .get('/', expenseController.getAllExpenses)
  .post('/', expenseController.createExpense)
  .get('/:id', expenseController.getExpenseById)
  .patch('/:id', expenseController.updateExpenseById)
  .delete('/:id', expenseController.removeExpenseById);

module.exports = {
  router,
};
