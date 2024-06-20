const express = require('express');
const expenseRouter = express.Router();
const expenseController = require('../controllers/expenseController');

expenseRouter.get('/', expenseController.getAll);

expenseRouter.get('/:id', expenseController.getExpense);

expenseRouter.post('/', expenseController.createExpense);

expenseRouter.delete('/:id', expenseController.removeExpense);

expenseRouter.patch('/:id', expenseController.updateExpense);

module.exports = {
  expenseRouter,
};
