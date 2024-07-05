const express = require('express');
const expensesRoute = express.Router();
const expensesController = require('../controllers/expenses.controller');

expensesRoute.get('/', expensesController.get);
expensesRoute.get('/:id', expensesController.getOne);
expensesRoute.post('/', expensesController.create);
expensesRoute.patch('/:id', expensesController.update);
expensesRoute.delete('/:id', expensesController.deleting);

module.exports = {
  expensesRoute,
};
