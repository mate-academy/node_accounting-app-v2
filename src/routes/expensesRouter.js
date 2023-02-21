'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController');

const expenseRouter = express.Router();

expenseRouter.get('/', expensesController.getAll);

expenseRouter.get('/:expenseId', expensesController.getExpenseId);

expenseRouter.post('/', express.json(), expensesController.addExpense);

expenseRouter.delete('/:expenseId', expensesController.deleteExpense);

expenseRouter.patch(
  '/:expenseId', express.json(), expensesController.updateExpense
);

module.exports = { expenseRouter };
