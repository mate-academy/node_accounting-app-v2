'use strict';

const express = require('express');
const router = express.Router();

const {
  getAllExpanses,
  createNewExpanse,
  getExpenseById,
  changeExpanseFiled,
  deleteExpense,
} = require('../controllers/expenses');

router.post('/expenses', express.json(), createNewExpanse);

router.get('/expenses', getAllExpanses);

router.get('/expenses/:expenseId', getExpenseById);

router.patch('/expenses/:expenseId', express.json(), changeExpanseFiled);

router.delete('/expenses/:expenseId', deleteExpense);

module.exports.expenseRouter = router;
