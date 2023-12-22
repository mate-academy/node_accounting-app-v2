'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses.controller');

router.get('/', expensesController.get);

router.post('/', express.json(), expensesController.create);

router.get('/:id', expensesController.getById);

router.delete('/:id', expensesController.deleteById);

router.patch('/:id', express.json(), expensesController.update);

module.exports = router;
