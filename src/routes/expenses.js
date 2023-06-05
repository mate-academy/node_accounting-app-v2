'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getFiltered);
router.get('/:expenseId', expenseController.getById);
router.post('/', express.json(), expenseController.create);
router.patch('/:expenseId', express.json(), expenseController.update);
router.delete('/:expenseId', expenseController.remove);

module.exports = router;
