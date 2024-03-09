'use strict';

const express = require('express');
const expensesController = require('./expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getOne);
router.post('/', expensesController.add);
router.delete('/:id', expensesController.remove);
router.patch('/:id', expensesController.update);

module.exports = { router };
