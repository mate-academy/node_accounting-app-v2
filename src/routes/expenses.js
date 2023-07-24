'use strict';

const express = require('express');
const expenseController = require('../controller/expenses');

const router = express.Router();

router.get('/', expenseController.getFiltered);
router.post('/', expenseController.addExpense);
router.get('/:expenseId', expenseController.getOne);
router.delete('/:expenseId', expenseController.removeExpense);
router.patch('/:expenseId', expenseController.updateExpense);

module.exports = {
  expenseRouter: router,
};
