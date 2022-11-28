'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const expensesRoute = express.Router();

expensesRoute.get('/', expensesController.getAll);
expensesRoute.get('/:expenseId', expensesController.getOne);
expensesRoute.post('/', expensesController.create);
expensesRoute.patch('/:expenseId', expensesController.update);
expensesRoute.delete('/:expenseId', expensesController.remove);

module.exports = {
  expensesRoute,
};
