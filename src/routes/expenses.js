'use strict';

const express = require('express');
const {
  createExpense,
  getExpensesByQuery,
  getExpenseById,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenses.js');

const router = express.Router();

router.post('/', createExpense);
router.get('/', getExpensesByQuery);
router.get('/:id', getExpenseById);
router.delete('/:id', deleteExpense);
router.patch('/:id', updateExpense);

function getRouterExpenses() {
  return router;
};

module.exports = {
  getRouterExpenses,
};
