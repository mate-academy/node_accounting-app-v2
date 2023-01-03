'use strict';

// const { express } = require('express');
const expensesController = require('../controller/expenses');

const express = require('express');
const router = express.Router();

router.get('/', expensesController.getAll);

router.get('/:expenseId', expensesController.findOne);

router.post('/', express.json(), expensesController.addOne);

router.delete('/:expenseId', expensesController.deleteOne);

router.patch('/:expenseId', express.json(), expensesController.patchOne);

module.exports = { router };
