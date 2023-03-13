'use strict';

const express = require('express');
const expensesController = require('../controller/expenses');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getOne);

router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', expensesController.update);

module.exports = {
  router,
};
