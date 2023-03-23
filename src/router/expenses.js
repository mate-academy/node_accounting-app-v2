'use strict';

const express = require('express');

const expenseController = require('../controller/expenses');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:expenseId', expenseController.getById);
router.post('/', expenseController.create);
router.delete('/:expenseId', expenseController.remove);
router.patch('/:expenseId', expenseController.update);

module.exports.router = router;
