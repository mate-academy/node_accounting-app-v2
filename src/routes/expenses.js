'use strict';

const expensesController = require('../controllers/expenses');
const express = require('express');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getExpense);
router.post('/', express.json(), expensesController.addNewExpense);
router.delete('/:expenseId', expensesController.deleteExpense);
router.patch('/:expenseId', express.json(), expensesController.updateExpense);

module.exports = {
  router,
};
