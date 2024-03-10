'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.get);
router.post('/', expenseController.createExpense);
router.get('/:id', expenseController.getById);
router.delete('/:id', expenseController.remove);
router.patch('/:id', expenseController.update);

module.exports = {
  expenseRouter: router,
};
