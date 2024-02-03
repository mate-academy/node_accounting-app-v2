'use strict';

const express = require('express');
const {
  getAllExpenses,
  createOneExpense,
  getOneExpense,
  deleteOneExpense,
  updateOneExpense,
} = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:id', createOneExpense);
expensesRouter.post('/', getOneExpense);
expensesRouter.delete('/:id', deleteOneExpense);
expensesRouter.patch('/:id', updateOneExpense);

module.exports = {
  expensesRouter,
};
