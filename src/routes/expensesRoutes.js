'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController.js');
const expensesService = require('../services/expensesServices.js');

const router = express.Router();

router.post('/', expensesService.createExpenses);

router.get('/', expensesController.getAll);

router.get('/:expenseId', expensesController.findById);

router.delete('/:expenseId', expensesController.deleteById);

router.patch('/:expenseId', expensesController.changeById);

module.exports = {
  router,
};
