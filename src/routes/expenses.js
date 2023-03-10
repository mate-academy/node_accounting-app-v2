'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', express.json(), expenseController.getAll);

router.get('/:expensesId', express.json(), expenseController.getOne);

router.post('/', express.json(), expenseController.add);

router.patch('/:expensesId', express.json(), expenseController.update);

router.delete('/:expensesId', expenseController.remove);

module.exports = { router };
