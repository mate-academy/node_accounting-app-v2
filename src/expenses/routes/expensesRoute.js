'use strict';

const expensesController = require('../controller/expense.controller')
  .controller;

const express = require('express');

const router = express.Router();

router.get('/', expensesController.get);
router.post('/', expensesController.post);
router.get('/:id', expensesController.getById);
router.delete('/:id', expensesController.deleteById);
router.patch('/:id', expensesController.patch);

module.exports = {
  router,
};
