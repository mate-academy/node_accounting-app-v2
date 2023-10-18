'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('./../controllers/expenses.controller');
const {
  expenseIdRouteParam,
  expenseCreateRequestBody,
  expenseUpdateRequestBody,
} = require('./../middleware/expenses.middleware');

router.param('expenseId', expenseIdRouteParam);

router.route('/')
  .get(expensesController.getAll)
  .post(express.json(), expenseCreateRequestBody, expensesController.create);

router.route('/:expenseId')
  .get(expensesController.get)
  .patch(express.json(), expenseUpdateRequestBody, expensesController.update)
  .delete(expensesController.remove);

module.exports = router;
