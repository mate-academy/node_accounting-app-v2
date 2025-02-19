'use strict';

const express = require('express');
const {
  getExpensesResponse,
  getExpenseResponse,
  createExpenseResponse,
  deleteExpenseResponse,
  updateExpenseResponse,
} = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', getExpensesResponse);

router.post('/', createExpenseResponse);

router.get('/:id', getExpenseResponse);

router.delete('/:id', deleteExpenseResponse);

router.patch('/:id', updateExpenseResponse);

module.exports = { router };
