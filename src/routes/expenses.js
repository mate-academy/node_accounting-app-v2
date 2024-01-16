'use strict';

const express = require('express');
const expensesRouter = express.Router();

const { getAllExpenses,
  addExpense,
  deleteExpense,
  getExpense,
  updateExpense } = require('../constrolers/expenses.controler');

expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:id', getExpense);
expensesRouter.post('/', express.json(), addExpense);
expensesRouter.delete('/:id', deleteExpense);
expensesRouter.patch('/:id', express.json(), updateExpense);

module.exports = expensesRouter;
