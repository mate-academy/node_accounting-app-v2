'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');

const router = express.Router();

router.get('/', expensesController.getAll);

router.get('/:expenseId', expensesController.getOne);

router.post('/', expensesController.add);

router.delete('/:expenseId', expensesController.remove);

router.patch('/:expenseId', expensesController.update);

module.exports = { router };
