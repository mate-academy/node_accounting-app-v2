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

router.get('/expenses/:expenseId', getExpenseController);

router.delete('/expenses/:expenseId', deleteExpenseController);

router.post('/', createNewExpenseController);

// eslint-disable-next-line
router.patch('/expenses/:expenseId', updateExpenseController);

module.exports.expressRouter = router;
