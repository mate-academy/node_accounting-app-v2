'use strict';

const expensesControllers = require('../controllers/expense.controllers');

const express = require('express');

const router = express.Router();

router.get('/', expensesControllers.get);

router.get('/:id', expensesControllers.getOneById);

router.post('/', expensesControllers.postOne);

router.delete('/:id', expensesControllers.deleteOne);

router.patch('/:id', expensesControllers.changedOne);

module.exports = {
  expenseRouter: router,
};
