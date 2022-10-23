'use strict';

const express = require('express');
const expenseControllers = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseControllers.getAll);
router.get('/:expenseId', expenseControllers.getOne);

router.post('/', expenseControllers.createExpense);
router.patch('/:expenseId', expenseControllers.updateExpense);
router.delete('/:expenseId', expenseControllers.deleteExpense);

module.exports = {
  router,
};
