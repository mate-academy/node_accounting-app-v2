'use strict';

const express = require('express');
const { expensesController } = require('../controller/expensesController');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', express.json(), expensesController.addExpense);
expensesRouter.get('/:expenseId', expensesController.getExpense);
expensesRouter.delete('/:expenseId', expensesController.deleteExpense);

expensesRouter.patch(
  '/:expenseId',
  express.json(),
  expensesController.updateExpense
);

module.exports = {
  expensesRouter,
};
