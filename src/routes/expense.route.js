'use strict';

const expenseController = require('../controllers/expense.controller');
const express = require('express');
const router = express.Router();

router.get('/', expenseController.get);

router.post('/', expenseController.create);

router.get('/:id', expenseController.getOne);

router.delete('/:id', expenseController.remove);

router.patch('/:id', expenseController.update);

module.exports = {
  router,
};
