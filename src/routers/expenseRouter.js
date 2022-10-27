'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controlers/expenseController');

router.post('/', expensesController.postExpense);

router.get('/', expensesController.getExpense);

router.get('/:id', expensesController.getExpenseId);

router.patch('/:id', expensesController.patchExpense);

router.delete('/:id', expensesController.deleteOneExpense);

module.exports = router;
