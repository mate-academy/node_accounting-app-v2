'use strict';

const express = require('express');

const expenseRouter = express.Router();

const expenseController = require('../controllers/expense.controller');

// expenseRouter.patch('/expenses/:id', expenseController.update);

// expenseRouter.get('/expenses', expenseController.get);

// expenseRouter.get('/expenses/:id', expenseController.getOne);

// expenseRouter.delete('/expenses/:id', expenseController.remove);

// expenseRouter.post('/expenses', expenseController.create);

expenseRouter.patch('/:id', expenseController.update);

expenseRouter.get('/', expenseController.get);

expenseRouter.get('/:id', expenseController.getOne);

expenseRouter.delete('/:id', expenseController.remove);

expenseRouter.post('/', expenseController.create);

module.exports = {
  expenseRouter,
};
