'use strict';

const express = require('express');
const expenseServices = require('../controllers/expenses');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseServices.getAll);
expenseRouter.get('/:expenseId', expenseServices.getOne);
expenseRouter.post('/', expenseServices.create);
expenseRouter.patch('/:expenseId', expenseServices.update);
expenseRouter.delete('/:expenseId', expenseServices.remove);

module.exports = expenseRouter;
