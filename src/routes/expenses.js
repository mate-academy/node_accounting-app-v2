'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getAll);

router.get('/:expenseId', expensesController.getOne);

router.post('/', express.json(), expensesController.addOne);

router.delete('/:expenseId', expensesController.deleteOne);

router.patch('/:expenseId', express.json(), expensesController.updateOne);

module.exports = router;
