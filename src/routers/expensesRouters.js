'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

router.get('/', expensesController.getAllExpenses);

router.get('/:expenseId', expensesController.getExpense);

router.post('/', express.json(), expensesController.postExpense);

router.patch('/:expenseId', express.json(), expensesController.patchExpense);

router.delete('/:expenseId', expensesController.deleteExpense);

module.exports = {
  router,
};
