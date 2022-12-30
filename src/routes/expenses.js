'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const route = express.Router();

route.get('/', expensesController.getAllExpenses);
route.post('/', expensesController.addExpense);
route.get('/:expenseId', expensesController.getOneExpense);
route.delete('/:expenseId', expensesController.deleteExpense);
route.patch('/:expenseId', expensesController.updateExpense);

module.exports = {
  route,
};
