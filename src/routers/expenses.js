'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');
const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getExpense);
router.post('/', expensesController.addExpense);
router.patch('/:expenseId', expensesController.update);
router.delete('/:expenseId', expensesController.remove);

module.exports = router;
