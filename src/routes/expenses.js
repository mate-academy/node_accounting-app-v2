'use strict';

const { expenseController } = require('../controllers/expenses.js');
const express = require('express');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getExpenses);
expenseRouter.post('/', expenseController.add);
expenseRouter.get('/:expenseId', expenseController.getOne);
expenseRouter.delete('/:expenseId', expenseController.remove);
expenseRouter.patch('/:expenseId', expenseController.update);

module.exports = { expenseRouter };
