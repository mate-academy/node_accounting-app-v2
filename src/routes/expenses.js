'use strict';

const router = require('express').Router();
const {
  getExpensesController,
  getExpenseByIdController,
  addExpenseController,
  removeExpenseController,
  updateExpenseController,
} = require('../controllers/expenses');

router.get('/', getExpensesController);
router.get('/:id', getExpenseByIdController);
router.post('/', addExpenseController);
router.delete('/:id', removeExpenseController);
router.patch('/:id', updateExpenseController);

module.exports = router;
