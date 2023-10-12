'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', express.json(), expensesController.get);

expensesRouter.post('/', express.json(), expensesController.create);

expensesRouter.get('/:id', express.json(), expensesController.getOne);

expensesRouter.delete('/:id', express.json(), expensesController.deleteOne);

expensesRouter.patch('/:id', express.json(), expensesController.update);

module.exports = {
  expensesRouter,
};
