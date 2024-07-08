'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controllers');

const router = express.Router();

const ROUTES = {
  ROOT: '/',
  ID: '/:id',
};

router
  .get(ROUTES.ROOT, expenseController.getAllExpenses)
  .post(ROUTES.ROOT, expenseController.createExpense)
  .get(ROUTES.ID, expenseController.getExpenseById)
  .patch(ROUTES.ID, expenseController.updateExpenseById)
  .delete(ROUTES.ID, expenseController.removeExpenseById);

module.exports = {
  router,
};
