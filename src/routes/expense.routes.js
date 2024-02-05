'use strict';

const { Router } = require('express');
const expController = require('../controllers/expense.controller');
const expenseRouter = Router();

expenseRouter.get('/', expController.getAllExpenses);
expenseRouter.post('/', expController.postExpense);
expenseRouter.get('/:id', expController.getExpense);
expenseRouter.delete('/:id', expController.deleteExpense);
expenseRouter.patch('/:id', expController.updateExpense);

module.exports = { expenseRouter };
