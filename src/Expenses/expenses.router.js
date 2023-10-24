'use strict';

const express = require('express');
const { expensesService } = require('./expenses.service');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesService.getAllExps);
expensesRouter.get('/:id', expensesService.getExp);
expensesRouter.post('/', expensesService.postExp);
expensesRouter.patch('/:id', expensesService.patchExp);
expensesRouter.delete('/:id', expensesService.deleteExp);

module.exports = {
  expensesRouter,
};
