'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getOne);

router.post('/', expensesController.createExpense);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', expensesController.update);

module.exports = { router };
