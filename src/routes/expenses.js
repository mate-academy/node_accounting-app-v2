'use strict';

const express = require('express');

const {
  getAllExpensesController,
  getExpenseController,
  deleteExpenseController,
  createNewExpenseController,
  updateExpenseController,
} = require('../controllers/expense');

const router = express.Router();

router.get('/', getAllExpensesController);

router.get('/:expenseId', getExpenseController);

router.delete('/:expenseId', deleteExpenseController);

router.post('/', createNewExpenseController);

router.patch('/:expenseId', updateExpenseController);

module.exports.expressRouter = router;
