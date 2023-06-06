'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getAllExpenses);
router.get('/:expenseId', expenseController.getOne);
router.post('/', expenseController.add);
router.delete('/:expenseId', expenseController.removeExpense);
router.patch('/:expenseId', expenseController.updateExpense);

module.exports = {
  router,
};
