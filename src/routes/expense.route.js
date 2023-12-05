'use strict';

const expensesControllers = require('../controllers/expense.controllers');

const express = require('express');

const expenseRouter = express.Router();

expenseRouter.get('/', express.json(), expensesControllers.get);

expenseRouter.get('/:id', express.json(), expensesControllers.getOneById);

expenseRouter.post('/', express.json(), expensesControllers.postOne);

expenseRouter.delete('/:id', express.json(), expensesControllers.deleteOne);

expenseRouter.patch('/:id', express.json(), expensesControllers.changedOne);

module.exports = {
  expenseRouter,
};
