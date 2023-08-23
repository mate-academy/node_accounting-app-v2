'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/', expenseController.getAllExpenses);

router.get('/:expenseId', expenseController.getOneExpense);

router.post('/', expenseController.addExpense);

router.patch('/:expenseId', expenseController.updateExpense);

router.delete('/:expenseId', expenseController.removeExpense);

module.exports = { router };
