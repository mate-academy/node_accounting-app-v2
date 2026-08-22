'use strict';

const express = require('express');

const {
  createExpensesController,
} = require('../controller/expenses.controller');

function createExpensesRouter(expensesService) {
  const router = express.Router();
  const expensesController = createExpensesController(expensesService);

  router.get('/', expensesController.getAll);
  router.get('/:id', expensesController.getOne);
  router.post('/', expensesController.create);
  router.patch('/:id', expensesController.update);
  router.delete('/:id', expensesController.remove);

  return router;
}

module.exports = {
  createExpensesRouter,
};
