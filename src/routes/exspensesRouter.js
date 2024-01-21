'use strict';

const express = require('express');
const { getOnceExpenses } = require('../controllers/expensesController');
const { getExpensesAll, createExpenses, updateExpense, removeExpenses }
  = require('../services/expensesService');
const expensesRouter = express.Router();

expensesRouter.get('/', getExpensesAll);
expensesRouter.get('/:id', getOnceExpenses);
expensesRouter.post('/', createExpenses);
expensesRouter.patch('/:id', updateExpense);
expensesRouter.delete('/:id', removeExpenses);

module.exports = {
  expensesRouter,
};
