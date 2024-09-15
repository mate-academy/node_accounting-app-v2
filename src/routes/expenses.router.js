'use strict';

const express = require('express');
const controller = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', controller.getAllExpenses);

expensesRouter.get('/:id', controller.getExpense);

expensesRouter.post('/', controller.post);

expensesRouter.delete('/:id', controller.removeExpense);

expensesRouter.patch('/:id', controller.updateExpense);

module.exports = expensesRouter;
