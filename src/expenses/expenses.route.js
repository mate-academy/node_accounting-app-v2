'use strict';

const express = require('express');
const { expensesController } = require('./expenses.controller');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.create);
expensesRouter.get('/:expenseId', expensesController.getById);
expensesRouter.patch('/:expenseId', expensesController.update);
expensesRouter.delete('/:expenseId', expensesController.delete);

module.exports = { expensesRouter };
