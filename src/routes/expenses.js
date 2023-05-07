'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseController');
const router = express.Router();

router.get('/', expenseController.getAllExpenses);

router.get('/:expanseId', expenseController.getById);

router.post('/', expenseController.add);

router.delete('/:expanseId', expenseController.remove);

router.patch('/:expanseId', expenseController.update);

module.exports = {
  expensesRouter: router,
  initExpenses: () => expenseController.initExpenses(),
};
