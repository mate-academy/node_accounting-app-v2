'use strict';

const express = require('express');
const expensesController = require('../controller/expenses');
const router = express.Router();

router.get('/expenses', expensesController.getAll);
router.post('/expenses', express.json(), expensesController.addOne);
router.get('/expenses/:expenseId', expensesController.getOne);
router.delete('/expenses/:expenseId', expensesController.deleteOne);

router.patch(
  '/expenses/:expenseId', express.json(), expensesController.updateOne
);

module.exports = { router };
