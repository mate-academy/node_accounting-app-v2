'use strict';

const express = require('express');

const expenseController = require('../controller/expenses');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:expenseId', expenseController.getById);
router.post('/', expenseController.createNew);
router.delete('/:expenseId', expenseController.deleteById);
router.patch('/:expenseId', expenseController.updateById);

module.exports = {
  router,
};
