'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllFilteredExpenses);
expensesRouter.get('/:expenseId', expensesController.getById);
expensesRouter.post('/', express.json(), expensesController.add);
expensesRouter.delete('/:expenseId', expensesController.remove);

expensesRouter.patch(
  '/:expenseId',
  express.json(),
  expensesController.update
);

module.exports = expensesRouter;
