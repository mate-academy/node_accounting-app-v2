'use strict';

const express = require('express');
const { Router } = require('express');
const { expensesController } = require('../controllers/expenses.controller');

const router = Router();

router.get('/', expensesController.getAll);

router.get('/:id', expensesController.getOne);

router.patch('/:id', expensesController.update);

router.delete('/:id', expensesController.remove);

router.post('/', express.json(), expensesController.add);

module.exports = { router };
