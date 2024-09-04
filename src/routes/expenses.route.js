/* eslint-disable no-console */
const express = require('express');
const expenseController = require('../controllers/expenses.controller');
const expensesService = require('../services/expenses.service');

const expensesRouter = express.Router();

const validateExpense = (req, res, next) => {
  expensesService.validate(req.body);

  const errors = expensesService.getErrors();

  if (Object.keys(errors).length > 0) {
    console.error(errors);
  }

  next();
};

expensesRouter.get('/', expenseController.getAllExpenses);

expensesRouter.get('/:id', expenseController.getExpenseForPerson);

expensesRouter.delete('/:id', expenseController.removeExpense);

expensesRouter.patch('/:id', validateExpense, expenseController.updateExpense);

expensesRouter.post('/', validateExpense, expenseController.addExpense);

module.exports = { expensesRouter };
