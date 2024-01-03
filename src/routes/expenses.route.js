'use strict';

const expensesController = require('../controllers/expenses.controller');

const express = require('express');

const expensesRouter = express.Router();

expensesRouter.use(express.json());

expensesRouter.get('/', expensesController.get);
expensesRouter.get('/:id', expensesController.getOneById);
expensesRouter.post('/', expensesController.postOne);
expensesRouter.delete('/:id', expensesController.deleteOne);
expensesRouter.patch('/:id', expensesController.updateOne);

module.exports = {
  expensesRouter,
};
