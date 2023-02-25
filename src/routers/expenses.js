'use strict';

const express = require('express');
const expenseControllers = require('../controllers/expense.controller');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseControllers.getAll);
expenseRouter.get('/:expenseId', expenseControllers.findById);
expenseRouter.post('/', express.json(), expenseControllers.create);
expenseRouter.delete('/:expenseId', expenseControllers.remove);
expenseRouter.patch('/:expenseId', express.json(), expenseControllers.update);

module.exports = {
  expenseRouter,
};
