'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controllers');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:id', expensesController.getExpense);

expensesRouter.post('/', expensesController.addExpense);

expensesRouter.delete('/:id', expensesController.deleteExpense);

expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
