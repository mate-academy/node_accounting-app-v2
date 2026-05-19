'use strict';

const { Router } = require('express');
const {
  listExpenses,
  getExpense,
  createExpense,
  handleUpdate,
  deleteExpense,
} = require('../controllers/expenses.controller');

const expensesRoute = Router();

expensesRoute.get('/', listExpenses);
expensesRoute.get('/:id', getExpense);
expensesRoute.post('/', createExpense);
expensesRoute.patch('/:id', handleUpdate);
expensesRoute.put('/:id', handleUpdate);
expensesRoute.delete('/:id', deleteExpense);

module.exports = { expensesRoute };
