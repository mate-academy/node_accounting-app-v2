'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseController');

const expenseRoutes = express.Router();

expenseRoutes.get('/', expenseController.getAllExpenses);

expenseRoutes.get('/:userId', expenseController.getExpenseByUserId);

expenseRoutes.post('/', expenseController.createExpense);

expenseRoutes.delete('/:id', expenseController.removeExpense);

expenseRoutes.patch('/:id', expenseController.updateExpense);

module.exports = { expenseRoutes };
