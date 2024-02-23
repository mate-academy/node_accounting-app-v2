'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const router = express.Router();

router.get('/', expensesController.get);

router.post('/', express.json(), expensesController.create);

router.get('/:id', express.json(), expensesController.getOne);

router.delete('/:id', express.json(), expensesController.remove);

router.patch('/:id', express.json(), expensesController.update);

module.exports = {
  expensesRouter: router,
};
