const express = require('express');
const { validateFields } = require('./../middlewares/validateFields');
const { validateEntry } = require('./../middlewares/validateEntry');
const expenseController = require('./../controllers/expense.controller');
const router = express.Router();

router.get('/', expenseController.get);

router.get('/:id', validateEntry('expense'), expenseController.getOne);

router.post(
  '/',
  validateFields(['userId', 'spentAt', 'title', 'amount', 'category']),
  expenseController.create,
);

router.delete('/:id', validateEntry('expense'), expenseController.remove);

router.patch('/:id', validateEntry('expense'), expenseController.update);

module.exports = { router };
