'use strict';

const express = require('express');
const expenseRouter = express.Router();
const userControllers = require('../controllers/expense.controller');

expenseRouter.get('/', userControllers.get);
expenseRouter.get('/:id', userControllers.getOneExpense);
expenseRouter.post('/', userControllers.addExpense);
expenseRouter.delete('/:id', userControllers.deleteExpense);
expenseRouter.patch('/:id', userControllers.changeExpense);

module.exports = { expenseRouter };
