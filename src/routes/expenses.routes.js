'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.get);

expensesRouter.get('/:id', expensesController.getOne);

expensesRouter.post('/', expensesController.post);

expensesRouter.patch('/:id', expensesController.patch);

expensesRouter.delete('/:id', expensesController.remove);

module.exports = { expensesRouter };
