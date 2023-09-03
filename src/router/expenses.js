'use strict';

const express = require('express');
const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', getExpenses);
router.post('/', express.json(), createExpense);
router.get('/:id', getExpense);
router.delete('/:id', deleteExpense);
router.patch('/:id', express.json(), updateExpense);

module.exports = router;
