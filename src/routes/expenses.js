'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getFiltered);
router.get('/:expenseId', expenseController.getById);
router.post('/', expenseController.create);
router.patch('/:expenseId', expenseController.update);
router.delete('/:expenseId', expenseController.remove);

module.exports = router;
