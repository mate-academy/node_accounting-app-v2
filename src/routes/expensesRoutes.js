'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController.js');

const router = express.Router();

router.post('/', expensesController.createExpenses);

router.get('/', expensesController.getAll);

router.get('/:expenseId', expensesController.findById);

router.delete('/:expenseId', expensesController.deleteById);

router.patch('/:expenseId', expensesController.changeById);

module.exports = {
  router,
};
