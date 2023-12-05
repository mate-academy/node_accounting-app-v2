'use strict';

const express = require('express');
const {
  getExpenses,
  postExpense,
  getExpenseById,
  deleteExpense,
  patchExpense,
} = require('../controllers/expenseController.js');

const router = express.Router();

router.get('/', getExpenses);

router.post('/', express.json(), postExpense);

router.get('/:id', getExpenseById);

router.delete('/:id', deleteExpense);

router.patch('/:id', express.json(), patchExpense);

module.exports = { router };
