'use strict';

const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenses');

router.get('/', expenseController.getAll);

router.get('/:expenseId', expenseController.findOne);

router.post('/', express.json(), expenseController.addOne);

router.delete('/:expenseId', express.json(), expenseController.deleteOne);

router.patch('/:expenseId', express.json(), expenseController.updateOne);

module.exports = { router };
