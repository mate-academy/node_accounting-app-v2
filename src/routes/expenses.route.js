'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', express.json(), expensesController.getAll);

expensesRouter.post('/', express.json(), expensesController.create);

expensesRouter.get('/:id', express.json(), expensesController.getById);

expensesRouter.delete('/:id', express.json(), expensesController.remove);

expensesRouter.patch('/:id', express.json(), expensesController.update);

module.exports = {
  expensesRouter,
};
