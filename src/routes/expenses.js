'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.post('/', expenseController.add);
expenseRouter.get('/:expenseId', expenseController.getOne);
expenseRouter.delete('/:expenseId', expenseController.remove);
expenseRouter.patch('/:expenseId', expenseController.update);

module.exports = { expenseRouter };
