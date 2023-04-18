'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getUserExpenses);
router.get('/:expenseId', expensesController.findById);
router.post('/', express.json(), expensesController.add);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', express.json(), expensesController.update);

module.exports = { router };
