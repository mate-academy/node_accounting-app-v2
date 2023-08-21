'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getExpenses);
router.get('/:expenseId', expenseController.getExpense);
router.post('/', expenseController.createExpense);
router.delete('/:expenseId', );
router.patch('/:expenseId', );

module.exports = router;
