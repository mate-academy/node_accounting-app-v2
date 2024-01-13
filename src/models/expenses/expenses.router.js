'use strict';

const express = require('express');
const expensesController = require('./expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.delete('/:id', expensesController.remove);
router.post('/', express.json(), expensesController.create);
router.patch('/:id', express.json(), expensesController.update);

module.exports = {
  expensesRouter: router,
};
