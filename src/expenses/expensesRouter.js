'use strict';

const express = require('express');
const expensesController = require('../expenses/expensesController');

const router = express.Router();

router.get('/', expensesController.getAllByQuery);

router.get('/:expenseId', expensesController.getSingleExpense);

router.post('/', expensesController.addExpense);

router.patch('/:expenseId', expensesController.updateExpense);

router.delete('/:expenseId', expensesController.deleteExpense);

module.exports.router = router;
