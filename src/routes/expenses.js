'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expensesController.getAll);
router.post('/', expensesController.create);
router.get('/:expenseId', expensesController.getById);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', expensesController.update);

module.exports = {
  router,
};
