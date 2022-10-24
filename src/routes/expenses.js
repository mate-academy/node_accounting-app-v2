'use strict';

const express = require('express');
const router = express.Router();

const {
  createExpence,
  getAllExpensesByParams,
  updateExpense,
  deleteExpense,
  getExpenceById,
} = require('../controllers/expensesService.js');

router.post('/', createExpence);

router.get('/', getAllExpensesByParams);

router.get('/:id', getExpenceById);

router.patch('/:id', updateExpense);

router.delete('/:id', deleteExpense);

module.exports = router;
