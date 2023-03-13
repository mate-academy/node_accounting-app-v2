'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:expenseId', expenseController.getOne);
expenseRouter.post('/', expenseController.createOne);
expenseRouter.patch('/:expenseId', expenseController.updateOne);
expenseRouter.delete('/:expenseId', expenseController.deleteOne);

module.exports = expenseRouter;
