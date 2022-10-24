'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:expenseId', expenseController.getOne);
router.post('/', expenseController.addExpense);
router.patch('/:expenseId', expenseController.updateExpense);
router.delete('/:expenseId', expenseController.removeExpense);

module.exports = {
  router,
};
