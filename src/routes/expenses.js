'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:expenseId', expensesController.getOneById);
expensesRouter.post('/', expensesController.addOne);
expensesRouter.delete('/:expenseId', expensesController.deleteOne);
expensesRouter.patch('/:expenseId', expensesController.updateOne);

module.exports = { expensesRouter };
