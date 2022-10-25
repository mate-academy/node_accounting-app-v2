'use strict';

const expenseController = require('../controllers/expenses');
const express = require('express');

const expensesRouter = express.Router();

expensesRouter.post('/expenses', express.json(), expenseController.create);
expensesRouter.get('/expenses', expenseController.getAll);
expensesRouter.get('/expenses/:expenseId', expenseController.getOne);
expensesRouter.delete('/expenses/:expenseId', expenseController.remove);

expensesRouter
  .patch('/expenses/:expenseId', express.json(), expenseController.update);

module.exports = expensesRouter;
