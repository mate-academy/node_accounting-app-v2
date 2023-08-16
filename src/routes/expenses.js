'use strict';

const ExpensesController = require('../controllers/expenses');

const express = require('express');

const router = express.Router();

router.get('/', ExpensesController.getAllExpenses);

router.post('/', ExpensesController.addNewExpenses);

router.get('/:expensesId', ExpensesController.getOneExpenses);

router.delete('/:expensesId', ExpensesController.deleteExpenses);

router.patch('/expensesid', ExpensesController.getAllExpenses);

module.exports = {
  router,
};
