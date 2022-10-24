'use strict';

const express = require('express');
const cors = require('cors');
const expenseContollers = require('../controllers/expensesControllers.js');

const router = express.Router();

router.use(cors());

router.get('/', expenseContollers.getAllExpenses);

router.get('/:id', expenseContollers.getExpenserById);

router.post('/', expenseContollers.createExpense);

router.delete('/:id', expenseContollers.deleteExpense);

router.patch('/:id', expenseContollers.updateExpense);

module.exports = { router };
