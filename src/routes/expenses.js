'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/expenses', expensesController.getAll);
expensesRouter.get('/expenses', expensesController.getAllFilteredExpenses);
expensesRouter.get('/expenses/:expenseId', expensesController.getById);
expensesRouter.post('/expenses', express.json(), expensesController.add);
expensesRouter.delete('/expenses/:expenseId', expensesController.remove);

expensesRouter.patch(
  '/expenses/:expenseId',
  express.json(),
  expensesController.update
);

module.exports = expensesRouter;
