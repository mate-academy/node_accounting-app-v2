'use strict';

const express = require('express');
const expensesControllers = require('./controllers-expenses.js');

const router = express.Router();

router.get('/expenses', expensesControllers.getAll);

router.get('/expenses/:expenseId', expensesControllers.getExpense);

router.post('/expenses', expensesControllers.createExpense);

router
  .delete('/expenses/:expenseId', expensesControllers.deleteExpense);

router
  .patch('/expenses/:expenseId', expensesControllers.updateExpense);

module.exports = {
  router,
};
