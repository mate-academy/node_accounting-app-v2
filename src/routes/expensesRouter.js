'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expensesController');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:expenseId', expensesController.findOne);

expensesRouter.post('/', expensesController.addOne);

expensesRouter.patch('/:expenseId', expensesController.updateOne);

expensesRouter.delete('/:expenseId', expensesController.deleteOne);

module.exports = { expensesRouter };
