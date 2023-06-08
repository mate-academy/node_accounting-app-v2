'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expensesController = require('../controllers/expenses.js');

expensesRouter.get('/', expensesController.getAll);

expensesRouter.post('/', expensesController.add);

expensesRouter.get('/:id', expensesController.getOne);

expensesRouter.delete('/:id', expensesController.remove);

expensesRouter.patch('/:id', expensesController.update);

module.exports = {
  expensesRouter,
};
