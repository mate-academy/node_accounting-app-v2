'use strict';

const express = require('express');
const expensesController = require('../controller/expenses');
const router = express.Router();

router.post('/', expensesController.post);

router.get('/', expensesController.get);

router.get('/:id', expensesController.getId);

router.patch('/:id', expensesController.patch);

router.delete('/:id', expensesController.deleteExpense);

module.exports = router;
