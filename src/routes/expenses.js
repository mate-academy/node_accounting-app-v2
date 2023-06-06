'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses');

router.get('/', expensesController.getAllFiltered);
router.delete('/:expenseId', expensesController.removeExpense);
router.post('/', expensesController.addExpense);
router.patch('/:expenseId', expensesController.updateExpense);
router.get('/:expenseId', expensesController.getOne);

module.exports = {
  expenseRouter: router,
};
