'use strict';

const router = require('express').Router();
const {
  getExpensesController,
  getExpenseByIdController,
  getExpenseByUserIdController,
  addExpenseController,
  removeExpenseController,
} = require('../controllers/expenses');
const { updateExpense } = require('../services/expenses');

router.get('/', getExpensesController);
router.get('/:id', getExpenseByIdController);
router.get('/?userId', getExpenseByUserIdController);
router.post('/', addExpenseController);
router.delete('/:id', removeExpenseController);
router.patch('/:id', updateExpense);

module.exports = router;
