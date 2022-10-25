'use strict';

const express = require('express');
const expenseControler = require('../controllers/expenses');
const expenseRouter = express.Router();

expenseRouter.post('/expenses', expenseControler.createExpense);
expenseRouter.get('/expenses', expenseControler.getExpenses);
expenseRouter.get('/expenses/:expensId', expenseControler.getExpensesId);
expenseRouter.delete('/expenses/:expensId', expenseControler.deleteExpense);
expenseRouter.patch('/expenses/:expensId', expenseControler.updateExpendse);

module.exports = {
  expenseRouter,
};
