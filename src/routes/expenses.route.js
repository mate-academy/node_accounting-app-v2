const express = require('express');
const { expensesController } = require('../controller/expenses.controller');

const expensesRoutes = express.Router();

expensesRoutes.get('/', expensesController.getAll);
expensesRoutes.get('/:id', expensesController.getById);
expensesRoutes.post('/', expensesController.create);
expensesRoutes.delete('/:id', expensesController.deleteOne);
expensesRoutes.put('/:id', expensesController.changeOne);

module.exports = expensesRoutes;
