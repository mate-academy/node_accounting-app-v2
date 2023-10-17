'use strict';

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses.controller');

router.get('/', expenseController.getAllExpenses);

router.post('/', expenseController.createExpence);

router.get('/:id', expenseController.findExpenceById);

router.delete('/:id', expenseController.removeExpence);

router.patch('/:id', expenseController.updateExpence);

module.exports = {
  router,
};
