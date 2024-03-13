/* eslint-disable no-console */
'use strict';

const express = require('express');
const expensesController = require('../constrollers/expenses.controller');

const router = express.Router();

router.post('/', expensesController.create);

router.get('/', expensesController.getExpenses);

router.get('/:id', expensesController.getOne);

router.patch('/:id', expensesController.update);

router.delete('/:id', expensesController.remove);

module.exports = {
  router,
};
