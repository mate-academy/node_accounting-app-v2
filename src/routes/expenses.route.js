'use strict';

const expensesController = require('../controllers/expenses.controller');
const express = require('express');
const expensesRouter = express.Router();

expensesRouter.use(express.json());

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.post('/', expensesController.create);
expensesRouter.delete('/:id', expensesController.deleted);
expensesRouter.patch('/:id', expensesController.update);

module.exports = {
  expensesRouter,
};
