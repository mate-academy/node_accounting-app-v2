'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getExpenses);

expensesRouter.get('/:id', expensesController.getExpense);

expensesRouter.post('/', expensesController.createExpense);

expensesRouter.patch('/:id', expensesController.updateExpense);

expensesRouter.delete('/:id', expensesController.deleteExpense);

module.exports = expensesRouter;
