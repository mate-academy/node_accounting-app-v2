'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controller/expenseControllers');

router.patch('/:id', expensesController.patch);

router.delete('/:id', expensesController.deleteExpense);

router.post('/', expensesController.post);

router.get('/', expensesController.get);

router.get('/:id', expensesController.getId);

module.exports = router;
