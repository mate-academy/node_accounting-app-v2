'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getfiltered);
router.get('/:expenseId', expensesController.getById);
router.delete('/:expenseId', expensesController.remove);
router.post('/', expensesController.create);
router.patch('/:expenseId', expensesController.update);

module.exports = { router };
