'use strict';

const express = require('express');
const expensesController = require('../controller/expenses');
const router = express.Router();

router.get('/', expensesController.getAll);
router.post('/', expensesController.addOne);
router.get('/:expenseId', expensesController.getOne);
router.delete('/:expenseId', expensesController.deleteOne);

router.patch(
  '/:expenseId', expensesController.updateOne
);

module.exports = { router };
