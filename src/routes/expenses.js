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

router.post('/expenses', createExpence);

router.get('/expenses', getAllExpensesByParams);

router.get('/expenses/:id', getExpenceById);

router.patch('/expenses/:id', updateExpense);

router.delete('/expenses/:id', deleteExpense);

module.exports = router;
