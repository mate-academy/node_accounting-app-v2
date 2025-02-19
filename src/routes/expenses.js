'use strict';

const {
  getAllExpenses,
  createNewExpense,
  getExpenseById,
  deleteExpenseById,
  editExpenseField,
} = require('../controllers/expenses.controller.js');
const express = require('express');
const router = express.Router();

router.get('/', getAllExpenses);
router.post('/', createNewExpense);
router.get('/:id', getExpenseById);
router.delete('/:id', deleteExpenseById);
router.patch('/:id', editExpenseField);

module.exports = {
  router,
};
