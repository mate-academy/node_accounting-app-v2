'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:id', expensesController.getOne);

expensesRouter.post('/', expensesController.add);

expensesRouter.delete('/:id', expensesController.remove);

expensesRouter.patch('/:id', expensesController.update);

module.exports = expensesRouter;
