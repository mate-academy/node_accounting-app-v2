'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.contoller');

const router = express.Router();

router.get('/', expensesController.get);
router.post('/', expensesController.postOne);
router.get('/:id', expensesController.getOneById);
router.delete('/:id', expensesController.deleteOne);
router.patch('/:id', expensesController.updateOne);

module.exports = {
  expensesRouter: router,
};
