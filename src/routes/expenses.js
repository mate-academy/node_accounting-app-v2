'use strict';

const express = require('express');

const expenseController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:expenseId', expenseController.getOne);
router.post('/', express.json(), expenseController.add);
router.patch('/:expenseId', express.json(), expenseController.update);
router.delete('/:expenseId', expenseController.remove);

module.exports = {
  router,
};
