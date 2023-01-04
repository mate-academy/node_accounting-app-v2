'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');
const router = express.Router();

router.get('/', expensesController.getAllFiltered);
router.get('/:expenseId', expensesController.getById);
router.post('/', expensesController.create);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', expensesController.update);

module.exports = {
  router,
};
