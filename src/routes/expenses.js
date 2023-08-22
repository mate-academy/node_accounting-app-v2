'use strict';
/* eslint-disable max-len */

const {
  getAllExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  patchExpense,
} = require('../controllers/expenses.js');

const express = require('express');
const router = express.Router();

router.get('/', getAllExpenses);
router.get('/:id', getOneExpense);
router.post('/', addExpense);
router.delete('/:id', removeExpense);
router.patch('/:id', patchExpense);

module.exports = router;
