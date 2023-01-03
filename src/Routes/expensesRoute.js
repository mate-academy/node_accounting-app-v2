'use strict';

const express = require('express');
const router = express.Router();

const expensesController = require('../controllers/expensesController');

router.get('/', expensesController.getAll);

router.post('/', expensesController.addOne);

router.get('/:expenseId', expensesController.getOne);

router.delete('/:expenseId', expensesController.deleteOne);

router.patch('/:expenseId', expensesController.updateOne);

module.exports = router;
