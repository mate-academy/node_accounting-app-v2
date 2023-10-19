'use strict';

const express = require('express');
const controller = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', controller.getAll);

expensesRouter.post('/', controller.post);

expensesRouter.get('/:id', controller.getById);

expensesRouter.delete('/:id', controller.remove);

expensesRouter.patch('/:id', controller.updateExpense);

module.exports = { expensesRouter };
