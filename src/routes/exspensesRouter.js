'use strict';

const express = require('express');
const {
  getOnceExpenses,
  getExpenses,
  creatNewExpenses,
  updateExpense,
  removeExpenses,
} = require('../controllers/expensesController');
const expensesRouter = express.Router();

expensesRouter.get('/', getExpenses);
expensesRouter.get('/:id', getOnceExpenses);
expensesRouter.post('/', creatNewExpenses);
expensesRouter.patch('/:id', updateExpense);
expensesRouter.delete('/:id', removeExpenses);

module.exports = {
  expensesRouter,
};
