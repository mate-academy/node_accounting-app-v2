'use strict';

const express = require('express');
const { expenseController } = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);

expenseRouter.post('/', expenseController.add);

expenseRouter.get('/:expenseId', expenseController.getById);

expenseRouter.delete('/:expenseId', expenseController.remove);

expenseRouter.patch('/:expenseId', expenseController.update);

module.exports = {
  expenseRouter,
};
