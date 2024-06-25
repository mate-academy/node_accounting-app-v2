'use strict';

const { Router } = require('express');
const expensesController = require('../controllers/expensesController');

const router = Router();

router.get('/', expensesController.getAllExpenses);

router.get('/:id', expensesController.getExpenseById);

router.post('/', expensesController.addExpense);

router.patch('/:id', expensesController.updateExpense);

router.delete('/:id', expensesController.deleteExpense);

module.exports = {
  expensesRouter: router,
};
