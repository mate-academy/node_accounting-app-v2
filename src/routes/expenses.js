'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');
const router = express.Router();

router.post('/', expensesController.add);
router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getOne);
router.patch('/:expenseId', expensesController.update);
router.delete('/:expenseId', expensesController.remove);

module.exports = {
  router,
};
