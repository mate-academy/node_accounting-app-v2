'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);
router.post('/', expensesController.createExpenses);
router.get('/:id', expensesController.getById);
router.patch('/:id', expensesController.updateExpenses);
router.delete('/:id', expensesController.deleteExpenses);

module.exports = router;
