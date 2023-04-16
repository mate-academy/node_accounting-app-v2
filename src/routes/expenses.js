'use strict';

const express = require('express');

const router = express.Router();
const expensesControllers = require('../controllers/expenses');

router.get('/', expensesControllers.getAll);

router.get('/:expenseId', expensesControllers.getOne);

router.post('/', expensesControllers.create);

router.patch('/:expenseId', expensesControllers.update);

router.delete('/:expenseId', expensesControllers.remove);

module.exports = router;
