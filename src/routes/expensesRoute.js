'use strict';

const express = require('express');

const { expensesController } = require('../controllers/expensesContoller');

const expensesRoute = express.Router();

expensesRoute.get('/expenses', expensesController.getAll);

expensesRoute.get('/expenses', expensesController.getAllWithQuery);

expensesRoute.get('/expenses/:expenseId', expensesController.getOne);

expensesRoute.post('/expenses', express.json(), expensesController.addOne);

expensesRoute.delete('/expenses/:expenseId', expensesController.deleteOne);

expensesRoute.patch(
  '/expenses/:expenseId',
  express.json(),
  expensesController.updateOne
);

module.exports = expensesRoute;
