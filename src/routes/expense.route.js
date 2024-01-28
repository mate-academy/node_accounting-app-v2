'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.get);
expenseRouter.post('/', expenseController.post);
expenseRouter.get('/:id', expenseController.getById);
expenseRouter.delete('/:id', expenseController.remove);
expenseRouter.patch('/:id', expenseController.update);

module.exports = { expenseRouter };
