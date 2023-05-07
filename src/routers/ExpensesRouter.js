'use strict';

const expensesController = require('../controllers/ExpensesController');
const express = require('express');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getOne);
router.post('/', express.json(), expensesController.add);
router.delete('/:expenseId', expensesController.remove);
router.put('./:expenseId', express.json(), expensesController.update);

module.exports = { router };
